# 🤖 RoboPact - 机器人契约

一个自动执行、带有经济惩罚的链上承诺协议，用无法篡改的智能合约帮助人们战胜拖延、信守承诺。

## 项目简介

RoboPact 是一个基于区块链的承诺执行系统，通过智能合约实现：

- **快速裁决**: 通过巧妙的链上博弈机制实现快速、公平的裁决
- **无法篡改**: 基于智能合约，所有承诺都记录在区块链上
- **经济激励**: 真金白银的押金机制，让承诺更有分量

## 技术栈

- **前端**: Next.js 15 + TypeScript
- **样式**: Tailwind CSS v4
- **状态管理**: Zustand
- **钱包连接**: Wagmi + RainbowKit
- **合约交互**: Viem
- **智能合约**: Solidity (Foundry/Hardhat)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

创建 `.env.local` 文件并配置以下环境变量：

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# 智能合约地址
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# 网络配置
NEXT_PUBLIC_CHAIN_ID=11155111
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 功能特性

### 已实现
- ✅ 钱包连接 (RainbowKit)
- ✅ 响应式 UI 设计
- ✅ 创建契约页面
- ✅ 契约列表页面
- ✅ 状态管理 (Zustand)
- ✅ 基础合约接口

### 待实现
- ⏳ 智能合约部署
- ⏳ 合约交互逻辑
- ⏳ 实时数据同步
- ⏳ 交易状态处理

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── create/            # 创建契约页面
│   ├── pacts/             # 契约列表页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── providers.tsx      # 全局 Providers
├── lib/                   # 工具库
│   ├── contract.ts        # 合约接口定义
│   └── wagmi.ts          # Wagmi 配置
└── store/                 # 状态管理
    └── pactStore.ts       # 契约状态
```

## 开发计划

根据项目大纲，开发分为以下阶段：

### 上午：核心合约开发
- [ ] 环境搭建与合约设计
- [ ] 合约编码与单元测试
- [ ] 部署与验证

### 下午：前端开发与集成
- [ ] 页面框架搭建
- [ ] 创建契约页面开发
- [ ] 契约列表页面开发

### 晚上：测试、打磨与演讲准备
- [ ] 端到端测试与修复
- [ ] 准备 Pitch & Demo

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
