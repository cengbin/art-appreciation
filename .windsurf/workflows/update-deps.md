---
description: 更新项目依赖
---

# 依赖更新工作流

## 步骤

1. 检查过期的依赖
```bash
npm outdated
```

2. 查看依赖的更新日志
- 访问 npm 包的 GitHub 仓库
- 查看 CHANGELOG 或 Release Notes
- 确认是否有破坏性变更

3. 更新特定依赖
```bash
npm update 包名
```

4. 或更新所有依赖到最新版本（谨慎使用）
```bash
npm update
```

5. 测试应用是否正常运行
// turbo
```bash
npm run dev
```

6. 运行代码检查
```bash
npm run lint
```

7. 构建测试
```bash
npm run build
```

8. 如果一切正常，提交更新
```bash
git add package.json package-lock.json
git commit -m "chore: 更新依赖包"
git push
```

## 注意事项

- 主版本更新（如 1.x -> 2.x）可能有破坏性变更
- 建议逐个更新重要依赖
- 更新后务必测试核心功能
