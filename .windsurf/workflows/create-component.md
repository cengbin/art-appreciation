---
description: 创建新的 React 组件
---

# 创建 React 组件工作流

## 步骤

1. 确定组件名称和位置
- 公共组件：`src/components/`
- 页面组件：`src/pages/`

2. 创建组件文件夹和文件
```bash
mkdir -p src/components/ComponentName
```

3. 创建组件主文件 `ComponentName.tsx`
```tsx
import './ComponentName.scss'

interface ComponentNameProps {
  // 定义 props 类型
}

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return (
    <div className="component-name">
      {/* 组件内容 */}
    </div>
  )
}

export default ComponentName
```

4. 创建样式文件 `ComponentName.scss`
```scss
.component-name {
  // 样式
}
```

5. 创建 index 导出文件 `index.ts`
```ts
export { default } from './ComponentName'
```

6. 在需要的地方导入使用
```tsx
import ComponentName from '@/components/ComponentName'
```

## 组件命名规范

- 使用 PascalCase（大驼峰）命名
- 文件名与组件名保持一致
- 样式文件使用相同的名称
