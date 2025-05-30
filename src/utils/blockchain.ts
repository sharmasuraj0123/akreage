import { createThirdwebClient, getContract, readContract, sendAndConfirmTransaction } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { claimTo } from 'thirdweb/extensions/erc721';
import { getWalletBalance, inAppWallet } from 'thirdweb/wallets';

const client = createThirdwebClient({
  clientId: "a32954d2274ff167331b829df4fd8e25",
});

// Keys for local storage
const WALLET_CONNECTED_KEY = 'akreage_wallet_connected';
const WALLET_ADDRESS_KEY = 'akreage_wallet_address';

// Track connection state in memory and localStorage
let userConnected = localStorage.getItem(WALLET_CONNECTED_KEY) === 'true';
// Store the connected account to reuse it
// We're using 'any' type here because the exact account type from thirdweb isn't easily accessible
// This represents a wallet account with at least an 'address' property
let connectedAccount: any = null;
let walletInstance: any = null;

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
    // If we already have a connected account, use it
    if (userConnected && connectedAccount) {
      const address = connectedAccount.address;
      const balance = await getWalletBalance({
        address,
        client,
        chain: sepolia
      });
      return { balance, address, account: connectedAccount };
    }
    
    // Otherwise create a new connection
    const wallet = inAppWallet();
    const account = await wallet.connect({ client, strategy: "google" });
    // Store it for future use
    connectedAccount = account;
    userConnected = true;
    
    // Store in localStorage
    localStorage.setItem(WALLET_CONNECTED_KEY, 'true');
    localStorage.setItem(WALLET_ADDRESS_KEY, account.address);
    
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

    // Connect wallet or reuse existing connection
    let account;
    if (userConnected && connectedAccount) {
      account = connectedAccount;
      console.log("Using existing wallet connection");
    } else {
      const wallet = inAppWallet();
      account = await wallet.connect({ client, strategy: "google" });
      userConnected = true;
      connectedAccount = account;
      console.log("Created new wallet connection");
      
      // Store in localStorage
      localStorage.setItem(WALLET_CONNECTED_KEY, 'true');
      localStorage.setItem(WALLET_ADDRESS_KEY, account.address);
    }
    
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

/**
 * Check if user is connected to wallet
 */
export async function isUserConnected() {
  // First check localStorage
  const storedConnected = localStorage.getItem(WALLET_CONNECTED_KEY) === 'true';
  const storedAddress = localStorage.getItem(WALLET_ADDRESS_KEY);
  
  // If we have stored connection info and in-memory account, use it
  if (storedConnected && storedAddress && connectedAccount && walletInstance) {
    try {
      // Verify the connection is still valid
      const isConnected = walletInstance.getAccount();
      if (isConnected && isConnected.address === storedAddress) {
        return true;
      }
    } catch (error) {
      console.log('Stored connection invalid, will attempt reconnect');
    }
  }
  
  // If we have stored connection but no in-memory account, try to recover it
  if (storedConnected && storedAddress) {
    try {
      console.log("Attempting to restore wallet connection...");
      const wallet = inAppWallet();
      
      // Try to auto-connect using stored session
      const account = await wallet.autoConnect({ 
        client,
      });
      
      if (account && account.address === storedAddress) {
        connectedAccount = account;
        walletInstance = wallet;
        userConnected = true;
        console.log("Successfully restored wallet connection");
        return true;
      }
    } catch (error) {
      console.log("Auto-connect failed, clearing stored state");
      // Clear invalid stored state
      localStorage.removeItem(WALLET_CONNECTED_KEY);
      localStorage.removeItem(WALLET_ADDRESS_KEY);
      userConnected = false;
      connectedAccount = null;
      walletInstance = null;
      return false;
    }
  }
  
  return false;
}

/**
 * Connect user wallet
 */
export async function connectUserWallet() {
  try {
    // If user is already connected and wallet is valid, reuse the existing account
    if (userConnected && connectedAccount && walletInstance) {
      try {
        const currentAccount = walletInstance.getAccount();
        if (currentAccount && currentAccount.address === connectedAccount.address) {
          console.log("User already connected, reusing account");
          return connectedAccount;
        }
      } catch (error) {
        console.log("Existing connection invalid, creating new connection");
      }
    }
    
    // Create a new wallet instance
    const wallet = inAppWallet();
    
    // First try to auto-connect if there's a stored session
    try {
      console.log("Attempting auto-connect...");
      const autoAccount = await wallet.autoConnect({ client });
      if (autoAccount) {
        console.log("Auto-connect successful");
        connectedAccount = autoAccount;
        walletInstance = wallet;
        userConnected = true;
        
        // Update localStorage
        localStorage.setItem(WALLET_CONNECTED_KEY, 'true');
        localStorage.setItem(WALLET_ADDRESS_KEY, autoAccount.address);
        
        return autoAccount;
      }
    } catch (error) {
      console.log("Auto-connect failed, proceeding with manual connection");
    }
    
    // If auto-connect fails, do manual connection
    console.log("Connecting wallet manually...");
    connectedAccount = await wallet.connect({ 
      client, 
      strategy: "google"
    });
    walletInstance = wallet;
    userConnected = true;
    
    // Store in localStorage
    localStorage.setItem(WALLET_CONNECTED_KEY, 'true');
    localStorage.setItem(WALLET_ADDRESS_KEY, connectedAccount.address);
    
    console.log("Wallet connected successfully:", connectedAccount.address);
    return connectedAccount;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    userConnected = false;
    connectedAccount = null;
    walletInstance = null;
    
    // Clear localStorage
    localStorage.removeItem(WALLET_CONNECTED_KEY);
    localStorage.removeItem(WALLET_ADDRESS_KEY);
    
    throw error;
  }
}

/**
 * Disconnect user wallet
 */
export async function disconnectUserWallet() {
  try {
    if (walletInstance) {
      await walletInstance.disconnect();
    }
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
  
  userConnected = false;
  connectedAccount = null;
  walletInstance = null;
  
  // Clear localStorage
  localStorage.removeItem(WALLET_CONNECTED_KEY);
  localStorage.removeItem(WALLET_ADDRESS_KEY);
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