---
description: Bug 修复标准流程
---

# Bug 修复工作流

## 步骤

1. 复现问题
- 记录复现步骤
- 确认问题的具体表现
- 检查浏览器控制台错误信息

2. 定位问题代码
- 使用 React DevTools 检查组件状态
- 检查网络请求
- 添加 console.log 调试

3. 分析问题原因
- 是逻辑错误？
- 是类型错误？
- 是依赖问题？
- 是环境问题？

4. 修复代码
- 编写修复代码
- 确保不影响其他功能

5. 测试修复结果
- 验证 bug 已修复
- 测试相关功能是否正常
- 检查是否有新的问题

6. 提交修复
```bash
git add .
git commit -m "fix: 修复具体问题的简短描述"
git push
```

## 调试技巧

- 使用 `debugger` 断点
- React DevTools 查看组件树
- Network 面板检查请求
- Console 查看错误堆栈
