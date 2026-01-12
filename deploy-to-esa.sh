#!/bin/bash
# 阿里云ESA自动化部署脚本

set -e  # 遇到错误时退出

echo "🔨 开始部署到阿里云ESA..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必需的命令
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}错误: 未找到 $1 命令${NC}"
        echo "请安装: $2"
        exit 1
    fi
}

echo -e "${YELLOW}1. 检查系统依赖...${NC}"
check_command "curl" "使用 apt install curl 或 brew install curl"
check_command "tar" "通常已预装"

echo -e "${YELLOW}2. 检查构建文件...${NC}"
if [ ! -d "dist" ]; then
    echo -e "${RED}错误: dist目录不存在${NC}"
    echo "请先运行: npm run build"
    exit 1
fi

echo -e "${GREEN}✓ 构建文件检查通过${NC}"

echo -e "${YELLOW}3. 打包部署文件...${NC}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="deploy_${TIMESTAMP}.tar.gz"
tar -czf $ZIP_NAME -C dist .

echo -e "${GREEN}✓ 打包完成: $ZIP_NAME${NC}"

echo -e "${YELLOW}4. 部署选项:${NC}"
echo "1) 手动部署 (推荐首次使用)"
echo "2) 通过FTP自动部署 (需要配置)"
echo "3) 通过API自动部署 (需要配置)"
echo -n "请选择 [1-3]: "
read choice

case $choice in
    1)
        echo -e "${GREEN}手动部署指南:${NC}"
        echo "1. 访问阿里云ESA控制台: https://esa.aliyun.com"
        echo "2. 创建新应用或选择现有应用"
        echo "3. 上传文件: $ZIP_NAME"
        echo "4. 解压到根目录"
        echo "5. 启动应用"
        ;;
    2)
        if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
            echo -e "${RED}请设置FTP环境变量:${NC}"
            echo "export FTP_HOST=your-ftp-host"
            echo "export FTP_USER=your-username"
            echo "export FTP_PASS=your-password"
            exit 1
        fi
        
        echo "正在通过FTP上传..."
        curl -T $ZIP_NAME "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/"
        echo -e "${GREEN}✓ FTP上传完成${NC}"
        ;;
    3)
        if [ -z "$ESA_API_KEY" ] || [ -z "$ESA_SECRET" ]; then
            echo -e "${RED}请设置ESA API环境变量${NC}"
            exit 1
        fi
        
        echo "正在通过API部署..."
        # 这里添加实际的API调用代码
        echo "API部署功能需要根据阿里云ESA的API文档实现"
        ;;
    *)
        echo -e "${RED}无效选择${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}🎉 部署准备完成！${NC}"
echo -e "文件大小: $(du -h $ZIP_NAME | cut -f1)"
echo -e "下一步: 将 $ZIP_NAME 上传到阿里云ESA控制台"
