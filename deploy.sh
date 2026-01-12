#!/bin/bash

echo "开始构建AI代码助手..."

# 检查环境变量
if [ -z "$ESA_OPENAI_API_KEY" ]; then
  echo "错误: 请设置ESA_OPENAI_API_KEY环境变量"
  exit 1
fi

# 安装依赖
npm ci

# 类型检查
npm run type-check

# 运行测试
npm run test

# 构建项目
npm run build

# 部署到ESA
npm run deploy:esa

echo "部署完成!"
