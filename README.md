# 🤖 RoboPact - Robot Pact

An automatically executed, economically penalized on-chain commitment protocol that helps people overcome procrastination and keep promises through tamper-proof smart contracts.

## Project Overview

RoboPact is a blockchain-based commitment execution system that implements:

- **Fast Arbitration**: Achieves fast and fair arbitration through ingenious on-chain game mechanisms
- **Tamper-Proof**: Based on smart contracts, all commitments are recorded on the blockchain
- **Economic Incentive**: Real money deposit mechanism makes commitments more meaningful

## Tech Stack

- **Frontend**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Wallet Connection**: Wagmi + RainbowKit
- **Contract Interaction**: Viem
- **Smart Contracts**: Solidity (Foundry/Hardhat)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file and configure the following environment variables:

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Smart Contract Address
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=10143
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Features

### Implemented

- ✅ Wallet Connection (RainbowKit)
- ✅ Responsive UI Design
- ✅ Create Pact Page
- ✅ Pact List Page
- ✅ State Management (Zustand)
- ✅ Basic Contract Interface
- ✅ Multi-language Support (i18n)
- ✅ Monad Testnet Integration

### To Be Implemented

- ⏳ Smart Contract Deployment
- ⏳ Contract Interaction Logic
- ⏳ Real-time Data Synchronization
- ⏳ Transaction Status Handling

## Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── create/        # Create pact page
│   │   ├── pacts/         # Pact list page
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Home page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root redirect
│   └── providers.tsx      # Global Providers
├── components/             # Reusable components
│   ├── Header.tsx         # Header component
│   ├── Footer.tsx         # Footer component
│   ├── LanguageSwitcher.tsx # Language switcher
│   └── CustomConnectButton.tsx # Custom connect button
├── lib/                   # Utility libraries
│   ├── contract.ts        # Contract interface definitions
│   ├── wagmi.ts          # Wagmi configuration
│   └── routing.ts        # Routing utilities
├── messages/              # Internationalization files
│   ├── en.json           # English translations
│   ├── zh.json           # Chinese translations
│   ├── fr.json           # French translations
│   ├── ja.json           # Japanese translations
│   ├── ko.json           # Korean translations
│   └── th.json           # Thai translations
└── store/                 # State management
    └── pactStore.ts       # Pact state
```

## Development Roadmap

Based on the project outline, development is divided into the following phases:

### Morning: Core Contract Development

- [ ] Environment setup and contract design
- [ ] Contract coding and unit testing
- [ ] Deployment and verification

### Afternoon: Frontend Development and Integration

- [ ] Page framework setup
- [ ] Create pact page development
- [ ] Pact list page development

### Evening: Testing, Refinement and Presentation Preparation

- [ ] End-to-end testing and fixes
- [ ] Pitch & Demo preparation

## Supported Languages

- 🇺🇸 English
- 🇨🇳 简体中文 (Simplified Chinese)
- 🇫🇷 Français (French)
- 🇯🇵 日本語 (Japanese)
- 🇰🇷 한국어 (Korean)
- 🇹🇭 ไทย (Thai)

## Network Support

- **Monad Testnet** (Primary): Chain ID 10143
- Ethereum Mainnet: Chain ID 1
- Sepolia Testnet: Chain ID 11155111
- Hardhat Local: Chain ID 31337

## Contributing

Issues and Pull Requests are welcome!

## License

MIT License
