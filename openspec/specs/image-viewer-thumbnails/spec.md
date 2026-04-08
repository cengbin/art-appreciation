## ADDED Requirements

### Requirement: 缩略图导航栏显示
系统 SHALL 在图片查看器底部显示缩略图导航栏，占据全宽。

#### Scenario: 显示缩略图栏
- **WHEN** 图片查看器打开且有多张图片
- **THEN** 底部显示深色半透明背景的缩略图导航栏

#### Scenario: 单张图片
- **WHEN** 只有一张图片
- **THEN** 不显示缩略图导航栏

#### Scenario: 禁用缩略图
- **WHEN** showThumbnails 属性设置为 false
- **THEN** 不显示缩略图导航栏

### Requirement: 缩略图渲染
系统 SHALL 渲染所有图片的缩略图，左对齐横向排列。

#### Scenario: 渲染缩略图列表
- **WHEN** 缩略图导航栏显示
- **THEN** 所有图片的缩略图按顺序从左到右排列

#### Scenario: 缩略图尺寸
- **WHEN** 在桌面端（>768px）
- **THEN** 缩略图尺寸为 70x70px

#### Scenario: 平板缩略图尺寸
- **WHEN** 在平板端（480-768px）
- **THEN** 缩略图尺寸为 55x55px

#### Scenario: 手机缩略图尺寸
- **WHEN** 在手机端（<480px）
- **THEN** 缩略图尺寸为 50x50px

### Requirement: 当前缩略图高亮
系统 SHALL 高亮显示当前正在查看的图片缩略图。

#### Scenario: 高亮当前缩略图
- **WHEN** 用户查看某张图片
- **THEN** 对应缩略图显示红色边框（#ff4444）和阴影效果

#### Scenario: 切换图片更新高亮
- **WHEN** 用户切换到另一张图片
- **THEN** 新图片的缩略图高亮，原缩略图恢复普通状态

### Requirement: 缩略图点击跳转
系统 SHALL 支持点击缩略图快速跳转到对应图片。

#### Scenario: 点击缩略图
- **WHEN** 用户点击任意缩略图
- **THEN** 图片查看器切换到对应图片并重置变换状态

#### Scenario: 点击当前缩略图
- **WHEN** 用户点击当前正在查看的缩略图
- **THEN** 保持当前图片显示，不触发切换

### Requirement: 缩略图自动滚动
系统 SHALL 自动滚动缩略图列表，保持当前缩略图在可视区域中心。

#### Scenario: 切换图片自动滚动
- **WHEN** 用户切换到不在可视区域的图片
- **THEN** 缩略图列表平滑滚动，将对应缩略图移到中心位置

#### Scenario: 初始显示
- **WHEN** 图片查看器打开
- **THEN** 缩略图列表滚动到当前图片位置

### Requirement: 缩略图横向滚动
系统 SHALL 支持横向滚动查看所有缩略图。

#### Scenario: 鼠标滚动
- **WHEN** 用户在缩略图区域横向滚动
- **THEN** 缩略图列表左右滚动

#### Scenario: 触摸滑动
- **WHEN** 用户在移动端触摸滑动缩略图区域
- **THEN** 缩略图列表跟随手指滑动

### Requirement: 缩略图懒加载
系统 SHALL 实现缩略图懒加载，优化性能。

#### Scenario: 可视区域加载
- **WHEN** 缩略图进入可视区域（含 50px 边距）
- **THEN** 开始加载该缩略图图片

#### Scenario: 不可见缩略图
- **WHEN** 缩略图不在可视区域
- **THEN** 不加载图片，显示加载占位符

### Requirement: 缩略图加载状态
系统 SHALL 显示缩略图加载状态。

#### Scenario: 加载中状态
- **WHEN** 缩略图图片正在加载
- **THEN** 显示图片序号作为占位符

#### Scenario: 加载完成
- **WHEN** 缩略图图片加载完成
- **THEN** 显示实际图片，淡入动画

### Requirement: 缩略图交互反馈
系统 SHALL 提供缩略图的交互视觉反馈。

#### Scenario: 鼠标悬停
- **WHEN** 用户鼠标悬停在缩略图上
- **THEN** 缩略图放大 1.05 倍并显示半透明红色边框

#### Scenario: 移开鼠标
- **WHEN** 用户鼠标移开缩略图
- **THEN** 缩略图恢复原始大小和边框样式
