---
description: 启动开发环境
---

# 启动开发环境工作流

## 步骤

1. 检查 Node.js 版本
// turbo
```bash
node --version
```

2. 安装项目依赖（如果是首次运行或依赖有更新）
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问
提示：开发服务器通常运行在 http://localhost:5173

## 常见问题

- 如果端口被占用，Vite 会自动使用下一个可用端口
- 如果依赖安装失败，尝试删除 `node_modules` 和 `package-lock.json` 后重新安装
