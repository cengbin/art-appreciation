---
name: figma-to-react-component
description: 从 Figma 设计生成 React 组件化页面
---

# Figma 到 React 组件化页面生成

这个 skill 帮助你从 Figma 设计自动生成组件化的 React 页面代码。

## 核心能力

当用户提供 Figma URL 时，自动执行以下流程：
1. 解析 URL 并读取 Figma 设计数据
2. 分析设计结构，识别组件层级
3. 生成组件化方案（组件树、数据结构）
4. 生成 React 代码（TypeScript 组件、样式、类型定义）
5. 创建文件到项目的 `src/pages/` 目录

## 工作流程

### 1. 读取 Figma 设计数据

**重要提示：** 必须先调用 Figma MCP 工具获取设计数据，才能进行后续分析和代码生成。

### 2. 分析设计结构

### 3. 生成组件化方案

**输出组件树结构**（使用树形图展示），例如：

```
CouponCenter (页面)
├── StatusBar (状态栏)
├── NavigationBar (导航栏)
├── StoreInfoCard (店铺信息卡片)
└── CouponList (优惠券列表)
    └── CouponCard (优惠券卡片 × 3)
```

### 4. 生成 React 代码

**代码生成规范（严格遵守）：**
- ✅ 使用 TypeScript
- ✅ 函数组件 + React Hooks
- ✅ Props 接口严格定义
- ✅ 导出组件使用 `export const ComponentName: React.FC<Props>`
- ✅ 样式使用 SCSS（`index.scss`）
- ❌ 不添加注释（除非必要）
- ❌ 不添加业务逻辑，只生成 UI 结构
- ❌ 不使用内联样式

**文件结构：**
```
src/
├── pages/
│   └── PageName/
│       ├─────components/
│       │     ├── ComponentName/
│       │     │   ├── index.tsx
│       │     │   └── index.scss
│       ├── index.tsx          # 页面主文件
│       ├── types.ts           # 类型定义
│       └── index.scss  # 样式文件

```

## 组件命名规范

- **组件名**：PascalCase（如 `CouponCard`, `UserProfile`）
- **文件名**：index.tsx（组件主文件）
- **Props 接口**：`ComponentNameProps`

## 输出内容清单

生成完成后，应该输出：

1. ✅ 组件层级结构图
2. ✅ 数据结构定义（TypeScript Type）
3. ✅ 所有组件文件代码
4. ✅ 所有样式文件
5. ✅ Mock 数据示例（可选）
6. ✅ 使用说明

## 注意事项

- 不修改现有业务逻辑
- 生成的代码需要立即可运行
- 样式尽量还原设计稿
- 组件名称语义化，易于理解
- 默认使用 CSS Modules 作为样式方案
- 如果设计中有图标，使用占位符或建议使用图标库

## 完整执行示例

**用户输入：**
```
@skill figma-to-react-component https://figma.com/board/a23DWyoQYpqVxYMuKtur2E/Diagram?node-id=1949-75522
```

## 关键注意事项

⚠️ **必须遵守的规则：**
1. 先调用 Figma MCP 工具，再进行分析
2. nodeId 格式必须是冒号分隔（`1:2`），不是短横线
3. 使用绝对路径创建文件
4. 从子组件到父组件依次创建
5. 每个组件必须有 3 个文件：`index.tsx`, `types.ts`, `index.scss`
6. 不修改现有文件，只创建新文件
7. 生成的代码必须可以立即运行
