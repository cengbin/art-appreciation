# 图片分类读取工具

这是一个Node.js程序，用于递归读取指定目录下的图片文件，并以图片所在目录名作为分类名称。

## 功能特性

- 📁 递归遍历指定目录及其子目录
- 🖼️ 支持多种图片格式（jpg, jpeg, png, gif, bmp, webp, svg, ico）
- 📊 以目录名作为图片分类
- 📝 生成详细的分类报告
- 💾 支持导出JSON格式数据

## 安装使用

### 1. 确保已安装Node.js
```bash
node --version
```

### 2. 运行程序
```bash
node read-images.js <目录路径>
```

### 使用示例
```bash
# 读取当前目录下的images文件夹
node read-images.js ./images

# 读取绝对路径
node read-images.js "C:\Users\用户\Pictures"

# 读取相对路径
node read-images.js ../photos
```

## 输出格式

程序会输出以下信息：

### 控制台输出
```
=== 图片分类结果 ===

📁 分类: 风景照片
   图片数量: 3
   1. sunset.jpg
      URL: 风景照片/sunset.jpg
   2. mountain.jpg
      URL: 风景照片/mountain.jpg
   3. lake.jpg
      URL: 风景照片/lake.jpg

📁 分类: 人物照片
   图片数量: 2
   1. portrait.jpg
      URL: 人物照片/portrait.jpg
   2. group.jpg
      URL: 人物照片/group.jpg

=== 统计信息 ===
总分类数: 2
总图片数: 5

✅ 数据已保存到: image-data.json
```

### JSON输出格式
```json
{
  "风景照片": [
    {
      "filename": "sunset.jpg",
      "url": "风景照片/sunset.jpg",
      "fullPath": "C:\\path\\to\\images\\风景照片\\sunset.jpg",
      "category": "风景照片"
    }
  ],
  "人物照片": [
    {
      "filename": "portrait.jpg",
      "url": "人物照片/portrait.jpg",
      "fullPath": "C:\\path\\to\\images\\人物照片\\portrait.jpg",
      "category": "人物照片"
    }
  ]
}
```

## 支持的图片格式

- `.jpg` / `.jpeg` - JPEG图片
- `.png` - PNG图片
- `.gif` - GIF动图
- `.bmp` - 位图
- `.webp` - WebP格式
- `.svg` - 矢量图
- `.ico` - 图标文件

## API使用

如果需要在其他Node.js程序中使用，可以这样导入：

```javascript
const { readImagesRecursively, printResult, saveToJSON } = require('./read-images.js');

// 读取图片数据
const imageData = readImagesRecursively('./images');

// 打印结果
printResult(imageData);

// 保存到JSON文件
saveToJSON(imageData, 'my-images.json');
```

## 注意事项

1. 确保指定的目录存在且可访问
2. 程序会自动跳过无法读取的目录并显示错误信息
3. URL路径统一使用正斜杠（/）格式
4. 生成的JSON文件默认保存在当前目录下

## 错误处理

程序包含完善的错误处理机制：
- 目录不存在时会提示错误
- 无法读取的文件会跳过并记录错误
- 权限不足的目录会被跳过

## 许可证

MIT License
