# 🚀 RoboPact 快速启动指南

## 环境要求

- Node.js 18+ 
- npm 或 yarn
- Git

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd monda-app
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
创建 `.env.local` 文件：
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111
```

### 4. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 智能合约开发

### 安装 Foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 运行测试
```bash
npm run test
```

### 编译合约
```bash
npm run compile
```

### 部署到本地网络
```bash
# 启动本地节点
anvil

# 在另一个终端部署
npm run deploy:local
```

## 项目结构

```
src/
├── app/           # Next.js 页面
├── lib/           # 工具库
└── store/         # 状态管理

contracts/         # 智能合约
test/              # 合约测试
script/            # 部署脚本
```

## 主要功能

1. **创建契约** - 设置承诺内容和押金
2. **标记完成** - 参与者标记任务完成
3. **自动结算** - 根据完成情况分配押金
4. **契约管理** - 查看和管理所有契约

## 技术栈

- **前端**: Next.js + TypeScript + Tailwind CSS
- **状态管理**: Zustand
- **钱包连接**: Wagmi + RainbowKit
- **智能合约**: Solidity + Foundry

## 常见问题

### Q: 如何获取 WalletConnect Project ID？
A: 访问 [WalletConnect Cloud](https://cloud.walletconnect.com/) 注册并创建项目。

### Q: 如何部署到测试网？
A: 配置 RPC URL 和私钥，然后运行 `npm run deploy:sepolia`。

### Q: 如何添加新的网络？
A: 在 `src/lib/wagmi.ts` 中添加新的链配置。

## 开发计划

- [ ] 合约部署到测试网
- [ ] 前端与合约集成
- [ ] 实时数据同步
- [ ] 错误处理优化
- [ ] 移动端适配

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
