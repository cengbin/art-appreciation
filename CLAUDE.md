# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 在此代码仓库中工作提供指导。

## 构建与开发命令

```bash
npm run dev      # 启动 Vite 开发服务器 (http://localhost:5173)
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
npm run lint     # 运行 ESLint 代码检查
```

## 架构概览

**技术栈**: React 19 + TypeScript + Vite 7 + React Router DOM 6 + Sass

**项目结构**:
- `src/` - 主应用源代码
  - `components/` - 可复用组件 (LazyImage, Loading)
  - `pages/` - 页面级组件 (Home, Images)
  - `router/` - 路由配置 (`routes.tsx` 定义路由，`index.tsx` 用 Suspense 包裹)
- `public/` - 静态资源
- `types/` - 全局 TypeScript 类型声明
- `image-category-generator/` - 独立的 Node.js 工具，用于按目录分类图片

**路由**: 使用 lazy loading 配合 Suspense。默认路由 `/` 重定向到 `/images`。

**组件模式**: 每个组件包含 `.tsx` + `.scss` 文件，可选 `index.ts` 用于导出。

## Windsurf 工作流

位于 `.windsurf/workflows/`:
- `dev-start.md` - 开发环境设置
- `create-component.md` - 组件创建模板 (大驼峰命名，SCSS 模块)
- `commit.md` - Git 提交规范 (feat/fix/docs/style/refactor/perf/test/chore)

## 注意事项

- TypeScript 使用 `bundler` 模块解析，启用了 `allowImportingTsExtensions`
- ESLint 忽略 `dist/` 目录，对未使用变量报警告 (PascalCase 或下划线前缀除外)
