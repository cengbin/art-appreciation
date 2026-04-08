## Why

当前项目使用第三方库 `react-viewer` 实现图片预览功能，存在依赖体积大、定制化受限、维护成本高等问题。同时，现有功能缺少缩略图导航，当图片数量较多时（50+ 张），用户无法快速浏览和跳转到特定图片。需要创建一个功能完整、性能优秀的自定义图片预览组件，提供更好的用户体验和可维护性。

## What Changes

- 创建自定义 ImageViewer 组件，完全替换 react-viewer 第三方库
- 实现图片缩放、旋转、拖拽、导航等核心功能
- 添加缩略图导航栏，支持快速浏览和跳转
- 实现懒加载和响应式设计，优化性能
- 提供完整的键盘快捷键支持
- 移除 react-viewer 依赖，减小包体积
- 更新 Images 页面的图片预览实现

## Capabilities

### New Capabilities
- `image-viewer-core`: 自定义图片预览组件的核心功能（显示、缩放、旋转、拖拽、导航）
- `image-viewer-thumbnails`: 缩略图导航功能（显示、点击跳转、自动滚动、懒加载）
- `image-viewer-keyboard`: 键盘快捷键支持（Esc、方向键、+/-、R）
- `image-viewer-responsive`: 响应式设计和移动端适配

### Modified Capabilities
<!-- 无现有能力需要修改 -->

## Impact

**代码变更**：
- 新增 `src/components/ImageViewer/` 目录及所有子组件
- 新增自定义 Hooks：useImageTransform、useDrag、useKeyboard
- 修改 `src/pages/Images/index.tsx` 替换 react-viewer 使用
- 新增 SCSS 样式文件

**依赖变更**：
- 移除 `react-viewer` 依赖
- 减小打包体积约 50-100KB

**用户体验**：
- 提供缩略图导航，提升浏览效率
- 更流畅的交互动画
- 更好的响应式体验

**性能影响**：
- 懒加载优化，减少初始加载时间
- 响应式图片尺寸，降低内存占用
- 整体性能优于原有实现
