#!/bin/bash

# 定义变量
ECS_HOST="your-ecs-ip"           # 阿里云 ECS 服务器 IP
ECS_USER="your-username"         # SSH 用户名，通常是 root
SSH_KEY="path/to/your/key.pem"   # SSH 密钥路径
DEPLOY_PATH="/path/to/deploy"    # 部署目标路径
PROJECT_NAME="your-project"      # 项目名称

# 输出颜色函数
echo_color() {
    case $1 in
        "green") echo -e "\033[32m$2\033[0m" ;;
        "red") echo -e "\033[31m$2\033[0m" ;;
        *) echo $2 ;;
    esac
}

# 检查上一个命令是否成功
check_status() {
    if [ $? -eq 0 ]; then
        echo_color "green" "✔ $1"
    else
        echo_color "red" "✘ $1"
        exit 1
    fi
}

# 开始部署
echo_color "green" "开始部署..."

# 打包项目（根据实际项目修改）
echo "正在打包项目..."
npm run build  # 如果是前端项目
# mvn clean package  # 如果是 Java 项目
check_status "项目打包"

# 创建临时目录
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEPLOY_TEMP_DIR="${PROJECT_NAME}_${TIMESTAMP}"

# 连接服务器并执行部署
echo "正在连接服务器..."
ssh -i $SSH_KEY $ECS_USER@$ECS_HOST << EOF
    # 创建部署目录（如果不存在）
    mkdir -p $DEPLOY_PATH
    cd $DEPLOY_PATH
    
    # 创建临时目录
    mkdir -p $DEPLOY_TEMP_DIR
    
    # 备份当前版本（如果存在）
    if [ -d "current" ]; then
        mv current $DEPLOY_TEMP_DIR/backup
    fi
EOF
check_status "服务器连接和目录准备"

# 上传文件
echo "正在上传文件..."
scp -i $SSH_KEY -r ./dist/* $ECS_USER@$ECS_HOST:$DEPLOY_PATH/$DEPLOY_TEMP_DIR/
check_status "文件上传"

# 部署新版本
ssh -i $SSH_KEY $ECS_USER@$ECS_HOST << EOF
    cd $DEPLOY_PATH
    
    # 停止当前运行的服务（根据实际情况修改）
    # pm2 stop your-app  # 如果使用 PM2
    # systemctl stop your-service  # 如果使用 systemd
    
    # 部署新版本
    ln -sfn $DEPLOY_TEMP_DIR current
    
    # 启动服务（根据实际情况修改）
    # cd current && pm2 start npm --name "your-app" -- start
    # systemctl start your-service
    
    # 清理旧版本（保留最近3个版本）
    cd $DEPLOY_PATH
    ls -t | grep ${PROJECT_NAME}_ | tail -n +4 | xargs rm -rf
EOF
check_status "新版本部署"

echo_color "green" "部署完成！" 