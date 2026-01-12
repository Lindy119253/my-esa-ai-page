#!/bin/bash
# fix-npm-error.sh

echo "🚀 开始修复 npm 错误..."

# 1. 清理缓存和旧文件
echo "🧹 清理缓存和旧文件..."
npm cache clean --force
rm -rf node_modules package-lock.json

# 2. 增加内存限制
echo "💾 增加内存限制..."
export NODE_OPTIONS="--max-old-space-size=4096"

# 3. 重新安装依赖
echo "📦 重新安装依赖..."
npm install --verbose

# 4. 检查依赖树
echo "🌳 检查依赖树..."
npm ls --depth=10

# 5. 运行 TypeScript 检查
echo "🔍 运行 TypeScript 检查..."
npm run type-check

# 6. 尝试构建
echo "🏗️ 尝试构建..."
npm run build --verbose

# 7. 如果失败，显示日志
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，显示错误日志..."
    tail -n 100 /home/runner/.npm/_logs/*debug*.log
else
    echo "🎉 构建成功！"
fi
