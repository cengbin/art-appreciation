# 艺术鉴赏项目 (Art Appreciation)

一个基于 React + Vite 构建的艺术作品展示与鉴赏平台。

## 📖 项目简介

本项目旨在提供一个优雅的艺术作品浏览和鉴赏体验，支持图片展示、分类浏览等功能。

## ✨ 技术栈

- **前端框架**: React 19.2.0
- **构建工具**: Vite 7.3.1
- **路由管理**: React Router DOM 6.3.0
- **图片查看器**: React Viewer 3.2.2
- **样式方案**: Sass
- **开发语言**: TypeScript
- **代码规范**: ESLint

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
art-appreciation/
├── src/
│   ├── components/      # 公共组件
│   ├── pages/          # 页面组件
│   │   ├── Home/       # 首页
│   │   └── Images/     # 图片展示页
│   ├── router/         # 路由配置
│   ├── App.tsx         # 应用主组件
│   ├── App.scss        # 全局样式
│   ├── main.tsx        # 应用入口
│   └── index.scss      # 基础样式
├── public/             # 静态资源
├── package.json        # 项目配置
└── vite.config.ts      # Vite 配置
```

## 🛠️ 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint 检查代码 |

## 📦 主要依赖

- **react**: ^19.2.0 - React 核心库
- **react-dom**: ^19.2.0 - React DOM 渲染
- **react-router-dom**: ^6.3.0 - 路由管理
- **react-viewer**: ^3.2.2 - 图片查看器组件
- **sass**: ^1.97.3 - CSS 预处理器

## 🔧 开发工具

- **TypeScript**: 类型安全
- **ESLint**: 代码质量检查
- **Vite**: 快速的开发构建工具