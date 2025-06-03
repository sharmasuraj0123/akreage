# Akreage - Real Estate Investment Platform

A modern real estate investment platform that connects investors with builders through blockchain technology and wallet-based authentication.

## 🏗️ Overview

Akreage is a decentralized platform that enables:
- **Investors** to discover and invest in real estate projects
- **Builders/Developers** to showcase projects and raise funding
- **Wallet-based authentication** for secure, decentralized user management
- **Real-time data** through Supabase integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account
- A wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sharmasuraj0123/akreage.git
cd akreage
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your Supabase credentials in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up the database (see [Database Setup](#-database-setup))

6. Start the development server:
```bash
npm run dev
```

## 📊 Database Setup

Follow the comprehensive database setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
- Configure your Supabase project
- Run database schema and migrations
- Seed initial data
- Set up Row Level Security policies

## 🔐 Authentication

This platform uses wallet-based authentication powered by ThirdWeb and RainbowKit. For detailed information about the authentication implementation, see:
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Complete wallet authentication implementation details
- [BUILDER_AUTHENTICATION.md](./BUILDER_AUTHENTICATION.md) - Builder-specific authentication states and flows

### Key Features:
- ✅ Wallet connection via multiple providers
- ✅ Automatic user creation on first login
- ✅ Persistent sessions across browser refreshes
- ✅ Unique wallet address linking

## 🏢 Platform Features

### For Investors
- Browse approved real estate projects
- View detailed project information and progress
- Secure wallet-based investment transactions
- Track investment portfolio

### For Builders/Developers
- **Logged Out**: Marketing landing page with platform benefits
- **Logged In**: Personal dashboard with project management tools
- Create and manage real estate projects
- Track funding progress and investor engagement
- Access to builder resources and analytics

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: ThirdWeb + RainbowKit + Wagmi
- **Blockchain**: Ethereum-compatible wallets
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── builder/        # Builder-specific components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   └── supabase/       # Supabase client and database functions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📖 Documentation

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete database setup guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Wallet authentication implementation details
- [BUILDER_AUTHENTICATION.md](./BUILDER_AUTHENTICATION.md) - Builder authentication states and routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the [troubleshooting section](./SUPABASE_SETUP.md#7-troubleshooting) in the Supabase setup guide
2. Verify your environment variables are correctly configured
3. Ensure your Supabase database is properly set up
4. Check the browser console for any error messages

For additional support, please open an issue in the GitHub repository.