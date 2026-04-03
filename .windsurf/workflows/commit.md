---
description: 代码提交到 GitHub 的完整流程
---

# 代码提交工作流

## 步骤

1. 检查当前代码状态
```bash
git status
```

2. 查看具体修改内容
```bash
git diff
```

3. 添加所有修改到暂存区
// turbo
```bash
git add .
```

4. 提交代码（使用规范的 commit 信息）
```bash
git commit -m "类型: 简短描述"
```

提交类型说明：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变动

5. 推送到 GitHub
```bash
git push
```

6. 验证推送结果
// turbo
```bash
git status
```
