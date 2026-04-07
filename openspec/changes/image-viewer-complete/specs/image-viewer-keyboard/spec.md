## ADDED Requirements

### Requirement: Esc 键关闭
系统 SHALL 支持按 Esc 键关闭图片查看器。

#### Scenario: 按 Esc 键
- **WHEN** 用户在图片查看器打开时按 Esc 键
- **THEN** 图片查看器关闭

#### Scenario: 查看器未打开
- **WHEN** 图片查看器未打开时按 Esc 键
- **THEN** 不触发任何操作

### Requirement: 方向键导航
系统 SHALL 支持方向键切换图片。

#### Scenario: 按右箭头键
- **WHEN** 用户按 → 键
- **THEN** 切换到下一张图片

#### Scenario: 按左箭头键
- **WHEN** 用户按 ← 键
- **THEN** 切换到上一张图片

#### Scenario: 最后一张按右键
- **WHEN** 用户在最后一张图片时按 → 键
- **THEN** 保持在当前图片，不切换

#### Scenario: 第一张按左键
- **WHEN** 用户在第一张图片时按 ← 键
- **THEN** 保持在当前图片，不切换

### Requirement: 加减键缩放
系统 SHALL 支持 +/- 键控制图片缩放。

#### Scenario: 按加号键
- **WHEN** 用户按 + 或 = 键
- **THEN** 图片放大 0.1 倍

#### Scenario: 按减号键
- **WHEN** 用户按 - 键
- **THEN** 图片缩小 0.1 倍

#### Scenario: 缩放边界
- **WHEN** 图片已达到最大或最小缩放比例
- **THEN** 继续按 +/- 键不再改变缩放

### Requirement: R 键旋转
系统 SHALL 支持 R 键旋转图片。

#### Scenario: 按 R 键
- **WHEN** 用户按 R 键
- **THEN** 图片顺时针旋转 90 度

#### Scenario: 连续按 R 键
- **WHEN** 用户连续按 R 键
- **THEN** 图片连续旋转（0°, 90°, 180°, 270°, 0°...）

### Requirement: 键盘事件监听
系统 SHALL 仅在图片查看器打开时监听键盘事件。

#### Scenario: 查看器打开时
- **WHEN** 图片查看器打开
- **THEN** 系统开始监听键盘事件

#### Scenario: 查看器关闭时
- **WHEN** 图片查看器关闭
- **THEN** 系统停止监听键盘事件，避免内存泄漏

### Requirement: 键盘事件优先级
系统 SHALL 确保键盘快捷键不与页面其他功能冲突。

#### Scenario: 输入框聚焦
- **WHEN** 用户在输入框中输入时
- **THEN** 键盘快捷键不触发图片查看器操作

#### Scenario: 查看器激活
- **WHEN** 图片查看器为当前活动元素
- **THEN** 键盘快捷键正常工作
