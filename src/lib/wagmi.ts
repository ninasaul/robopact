import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import { defineChain } from 'viem';

// 定义 Monad Testnet 链配置
const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz/'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com/',
    },
  },
  testnet: true,
});

// 为 Monad Testnet 添加官方图标
const monadTestnetWithIcon = {
  ...monadTestnet,
  iconUrl: 'https://cdn.prod.website-files.com/667c57e6f9254a4b6d914440/67b135627be8437b3cda15ae_Monad%20Logomark.svg',
  iconBackground: '#FFFFFF', // 白色背景以突出 Monad logo
};

export const config = getDefaultConfig({
  appName: 'RoboPact',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [monadTestnetWithIcon, mainnet, sepolia, hardhat],
  ssr: true,
});

// 导出 Monad Testnet 链配置，供其他组件使用
export { monadTestnet, monadTestnetWithIcon };
