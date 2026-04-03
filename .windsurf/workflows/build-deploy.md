---
description: 构建和部署项目到生产环境
---

# 构建和部署工作流

## 步骤

1. 运行代码检查
```bash
npm run lint
```

2. 构建生产版本
```bash
npm run build
```

3. 本地预览构建结果
```bash
npm run preview
```

4. 检查构建产物
// turbo
```bash
ls -lh dist
```

5. 提交构建相关的代码更改（如果有）
```bash
git add .
git commit -m "build: 更新构建配置"
git push
```

## 部署选项

### 选项 1: Vercel（推荐）
- 访问 https://vercel.com
- 导入 GitHub 仓库
- 自动部署

### 选项 2: GitHub Pages
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

### 选项 3: Netlify
- 拖拽 `dist` 文件夹到 Netlify
- 或连接 GitHub 仓库自动部署
