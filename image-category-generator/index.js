const fs = require('fs');
const path = require('path');
const config = require('./config.js');

/**
 * 递归读取指定目录下的图片文件
 * @param {string} rootDir 根目录路径
 * @returns {Object} 按分类组织的图片数据
 */
function readImagesRecursively(rootDir) {
    const result = {};
    
    // 支持的图片扩展名
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico'];
    
    /**
     * 递归遍历目录
     * @param {string} currentDir 当前目录
     * @param {string} relativePath 相对路径
     */
    function traverseDirectory(currentDir, relativePath = '') {
        try {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const itemPath = path.join(currentDir, item);
                const itemRelativePath = path.join(relativePath, item);
                const stats = fs.statSync(itemPath);
                
                if (stats.isDirectory()) {
                    // 检查是否在排除列表中
                    if (config.exclude && config.exclude.includes(item)) {
                        console.log(`跳过排除目录: ${itemPath}`);
                        continue;
                    }
                    // 如果是目录，递归遍历
                    traverseDirectory(itemPath, itemRelativePath);
                } else if (stats.isFile()) {
                    // 如果是文件，检查是否为图片
                    const ext = path.extname(item).toLowerCase();
                    if (imageExtensions.includes(ext)) {
                        // 获取目录名作为分类名
                        const categoryName = path.basename(currentDir);
                        
                        // 如果分类不存在，创建分类
                        if (!result[categoryName]) {
                            result[categoryName] = [];
                        }
                        
                        // 添加图片信息
                        result[categoryName].push({
                            filename: item,
                            url: itemRelativePath.replace(/\\/g, '/'), // 统一使用正斜杠
                            category: categoryName,
                            size: stats.size, // 文件大小
                            ext: ext.toLowerCase().replace('.', '') // 文件扩展名
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`读取目录失败: ${currentDir}`, error.message);
        }
    }
    
    traverseDirectory(rootDir);
    return result;
}

/**
 * 打印结果
 * @param {Object} data 图片数据
 */
function printResult(data) {
    console.log('=== 图片分类结果 ===\n');
    
    Object.keys(data).forEach(category => {
        console.log(`📁 分类: ${category}`);
        console.log(`   图片数量: ${data[category].length}`);
        
        data[category].forEach((image, index) => {
            console.log(`   ${index + 1}. ${image.filename}`);
            console.log(`      URL: ${image.url}`);
        });
        console.log('');
    });
    
    const totalImages = Object.values(data).reduce((sum, images) => sum + images.length, 0);
    const totalCategories = Object.keys(data).length;
    
    console.log(`=== 统计信息 ===`);
    console.log(`总分类数: ${totalCategories}`);
    console.log(`总图片数: ${totalImages}`);
}

/**
 * 确保目录存在，如果不存在则创建
 * @param {string} dirPath 目录路径
 */
function ensureDirectoryExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`📁 创建目录: ${dirPath}`);
        }
    } catch (error) {
        console.error(`创建目录失败: ${dirPath}`, error.message);
        throw error;
    }
}

/**
 * 生成适合前端使用的JSON数据结构
 * @param {Object} data 原始图片数据
 * @param {string} rootDir 根目录路径
 * @returns {Object} 优化后的数据结构
 */
function generateOptimizedData(data, rootDir) {
    const allImages = [];
    const categories = [];
    
    // 收集所有图片和分类信息
    Object.keys(data).forEach(categoryName => {
        const categoryImages = data[categoryName];
        
        // 添加分类信息
        categories.push({
            name: categoryName,
            count: categoryImages.length,
            id: categoryName
        });
        
        // 添加所有图片到全部列表
        categoryImages.forEach(image => {
            allImages.push(image);
        });
    });
    
    // 按文件名排序
    allImages.sort((a, b) => a.filename.localeCompare(b.filename));
    categories.sort((a, b) => a.name.localeCompare(b.name));
    
    return {
        meta: {
            totalImages: allImages.length,
            totalCategories: categories.length,
            rootDirectory: rootDir,
            generatedAt: new Date().toISOString()
        },
        categories: categories,
        images: {
            all: allImages,
            byCategory: data
        }
    };
}

/**
 * 保存结果到JSON文件
 * @param {Object} data 图片数据
 * @param {string} outputDir 输出目录
 * @param {string} fileName JSON文件名
 * @param {string} rootDir 根目录路径
 */
function saveToJSON(data, outputDir = './output', fileName = 'image-data.json', rootDir = '') {
    try {
        // 确保输出目录存在
        ensureDirectoryExists(outputDir);
        
        // 生成优化的数据结构
        const optimizedData = generateOptimizedData(data, rootDir);
        
        // 构建完整输出路径
        const outputPath = path.join(outputDir, fileName);
        
        fs.writeFileSync(outputPath, JSON.stringify(optimizedData, null, 2), 'utf8');
        console.log(`\n✅ 数据已保存到: ${outputPath}`);
        
        // 同时保存一个压缩版本用于生产环境
        const minifiedPath = path.join(outputDir, fileName.replace('.json', '.min.json'));
        fs.writeFileSync(minifiedPath, JSON.stringify(optimizedData), 'utf8');
        console.log(`✅ 压缩版本已保存到: ${minifiedPath}`);
        
    } catch (error) {
        console.error('保存JSON文件失败:', error.message);
    }
}

// 主函数
function main() {
    // 从配置文件读取设置
    const targetDirectory = config.input;
    const outputPath = config.output;
    const excludeDirs = config.exclude || [];
    
    // 解析输出路径，分离目录和文件名
    const outputDir = path.dirname(outputPath);
    const fileName = path.basename(outputPath);
    
    if (!targetDirectory) {
        console.error('错误: 配置文件中未指定输入目录');
        process.exit(1);
    }
    
    if (!fs.existsSync(targetDirectory)) {
        console.error(`错误: 目录不存在 - ${targetDirectory}`);
        process.exit(1);
    }
    
    if (!fs.statSync(targetDirectory).isDirectory()) {
        console.error(`错误: 指定路径不是目录 - ${targetDirectory}`);
        process.exit(1);
    }
    
    console.log(`开始扫描目录: ${targetDirectory}`);
    console.log(`输出文件: ${outputPath}`);
    console.log(`排除目录: ${excludeDirs.length > 0 ? excludeDirs.join(', ') : '无'}\n`);
    
    const imageData = readImagesRecursively(targetDirectory);
    
    printResult(imageData);
    saveToJSON(imageData, outputDir, fileName, targetDirectory);
}

// 如果直接运行此文件，执行主函数
if (require.main === module) {
    main();
}

// 导出函数供其他模块使用
module.exports = {
    readImagesRecursively,
    printResult,
    saveToJSON,
    ensureDirectoryExists,
    generateOptimizedData
};
