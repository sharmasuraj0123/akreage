import { createThirdwebClient, getContract, readContract, sendAndConfirmTransaction } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { claimTo } from 'thirdweb/extensions/erc721';
import { getWalletBalance, inAppWallet } from 'thirdweb/wallets';

const client = createThirdwebClient({
  clientId: "a32954d2274ff167331b829df4fd8e25",
});

/**
 * Get claim condition data for an NFT contract.
 * This includes total supply, claimed tokens, price, and currency.
 */
export async function getClaimConditionData(contractAddress: string) {
  try {
    const contract = getContract({
      client,
      chain: sepolia,
      address: contractAddress,
      abi: [
        {
          name: "getActiveClaimConditionId",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "uint256" }],
        },
        {
          name: "getClaimConditionById",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_conditionId", type: "uint256" }],
          outputs: [
            {
              name: "condition",
              type: "tuple",
              components: [
                { name: "startTimestamp", type: "uint256" },
                { name: "maxClaimableSupply", type: "uint256" },
                { name: "supplyClaimed", type: "uint256" },
                { name: "quantityLimitPerWallet", type: "uint256" },
                { name: "merkleRoot", type: "bytes32" },
                { name: "pricePerToken", type: "uint256" },
                { name: "currency", type: "address" },
                { name: "metadata", type: "string" },
              ],
            },
          ],
        },
      ],
    });

    const conditionId = await readContract({
      contract,
      method: "getActiveClaimConditionId",
    });

    const { maxClaimableSupply, supplyClaimed, pricePerToken, currency, quantityLimitPerWallet } =
      await readContract({
        contract,
        method: "getClaimConditionById",
        params: [conditionId],
      });

    return {
      maxClaimableSupply,
      supplyClaimed,
      pricePerToken,
      currency,
      quantityLimitPerWallet,
      conditionId
    };
  } catch (error) {
    console.error("Error fetching claim condition data:", error);
    return null;
  }
}

/**
 * Check user's wallet balance
 */
export async function getUserWalletBalance() {
  try {
    const wallet = inAppWallet();
    const account = await wallet.connect({ client, strategy: "google" });
    const address = account.address;
    
    const balance = await getWalletBalance({
      address,
      client,
      chain: sepolia
    });
    
    return { balance, address, account };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw error;
  }
}

/**
 * Verify and execute the NFT claim transaction
 */
export async function executeNFTClaim(contractAddress: string, quantity: bigint) {
  try {
    // Ensure quantity is a multiple of 5
    if (quantity % BigInt(5) !== BigInt(0)) {
      throw new Error("Quantity must be a multiple of 5");
    }

    // Connect wallet and get user info
    const wallet = inAppWallet();
    const account = await wallet.connect({ client, strategy: "google" });
    const address = account.address;

    // Get user balance
    const balance = await getWalletBalance({
      address,
      client,
      chain: sepolia
    });

    console.log("User balance:", balance);

    // Get contract and claim condition info
    const contract = getContract({
      client,
      chain: sepolia,
      address: contractAddress,
      abi: [
        {
          name: "getActiveClaimConditionId",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "uint256" }],
        },
        {
          name: "getClaimConditionById",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_conditionId", type: "uint256" }],
          outputs: [
            {
              name: "condition",
              type: "tuple",
              components: [
                { name: "startTimestamp", type: "uint256" },
                { name: "maxClaimableSupply", type: "uint256" },
                { name: "supplyClaimed", type: "uint256" },
                { name: "quantityLimitPerWallet", type: "uint256" },
                { name: "merkleRoot", type: "bytes32" },
                { name: "pricePerToken", type: "uint256" },
                { name: "currency", type: "address" },
                { name: "metadata", type: "string" },
              ],
            },
          ],
        },
      ],
    });

    // Get claim condition data
    const conditionId = await readContract({
      contract,
      method: "getActiveClaimConditionId",
    });

    const {
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerWallet,
      pricePerToken,
      currency,
    } = await readContract({
      contract,
      method: "getClaimConditionById",
      params: [conditionId],
    });

    console.log("Claim condition data:", {
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerWallet,
      pricePerToken,
      currency
    });

    // Check if there are enough tokens available to claim
    const tokensAvailable = maxClaimableSupply - supplyClaimed;
    if (tokensAvailable < quantity) {
      throw new Error(`Only ${tokensAvailable} tokens available to claim`);
    }

    // Calculate total cost
    const totalCost = pricePerToken * quantity;
    
    // Check if user has enough balance
    if (balance.value < totalCost) {
      throw new Error(`Insufficient balance. Required: ${totalCost}, Available: ${balance.value}`);
    }

    // Skip verification and directly execute the transaction
    console.log(`Executing transaction for ${quantity} tokens...`);
    
    // Execute the transaction
    const transaction = claimTo({
      contract,
      to: address,
      quantity: quantity
    });

    const transactionReceipt = await sendAndConfirmTransaction({
      account,
      transaction
    });

    console.log("Transaction completed:", transactionReceipt.transactionHash);

    return {
      success: true,
      transactionHash: transactionReceipt.transactionHash,
      tokensAvailable: tokensAvailable - quantity,
      tokensClaimed: supplyClaimed + quantity
    };
  } catch (error) {
    console.error("Error executing NFT claim:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed"
    };
  }
}

// Track connection state in memory (this is a simplified approach)
let userConnected = false;

/**
 * Check if user is connected to wallet
 */
export async function isUserConnected() {
  return userConnected;
}

/**
 * Connect user wallet
 */
export async function connectUserWallet() {
  try {
    const wallet = inAppWallet();
    const account = await wallet.connect({ client, strategy: "google" });
    userConnected = true;
    return account;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    userConnected = false;
    throw error;
  }
}

/**
 * Purchase an NFT using the thirdweb SDK
 * Note: This is a simplified version and needs to be completed with actual wallet integration
 */
export async function purchaseNFT(contractAddress: string, quantity: number = 1) {
  try {
    // This is a placeholder implementation - wallet connection would need to be properly implemented
    // based on the thirdweb wallet SDK version being used
    console.log("Attempting to purchase NFT from contract:", contractAddress);
    console.log("Quantity:", quantity);
    
    // For the actual implementation, you would need to:
    // 1. Connect a wallet
    // 2. Get the user's address
    // 3. Check if they have enough funds
    // 4. Call the claim function on the contract
    
    // Mock successful transaction
    return {
      success: true,
      transactionHash: "0x" + Math.random().toString(16).substring(2, 42),
    };
  } catch (error) {
    console.error("Error purchasing NFT:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
} 