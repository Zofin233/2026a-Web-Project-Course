# 学生成绩管理系统 - 项目结构解释文档

## 项目概述

学生成绩管理系统是一个基于Vue 3和Express的全栈应用，用于管理学生的成绩信息。系统支持添加、编辑、删除和查看学生成绩，具有美观的用户界面和流畅的交互体验。

## 项目结构

```
student-score-system/
├── backend/               # 后端代码
│   ├── config/            # 配置文件
│   │   └── config.js      # 数据库和服务器配置
│   ├── models/            # 数据库模型
│   │   ├── db.js          # 数据库连接和初始化
│   │   └── Student.js     # 学生模型（业务逻辑）
│   ├── routes/            # API路由
│   │   └── studentRoutes.js  # 学生相关API路由
│   ├── utils/             # 工具函数
│   ├── express_index.js    # 旧版入口文件（已弃用）
│   ├── index.js           # 主入口文件
│   ├── package-lock.json  # 依赖锁文件
│   └── package.json       # 后端依赖
├── vuestu/                # 前端代码
│   ├── public/            # 静态资源
│   │   ├── favicon.ico    # 网站图标
│   │   └── index.html     # 前端入口HTML
│   ├── src/               # 源代码
│   │   ├── assets/        # 静态资源
│   │   │   └── logo.png   # 项目logo
│   │   ├── components/     # 组件
│   │   │   ├── HelloWorld.vue  # 示例组件
│   │   │   ├── StudentEdit.vue  # 编辑学生组件
│   │   │   ├── StudentInfo.vue  # 学生列表组件
│   │   │   └── StudentInsert.vue  # 添加学生组件
│   │   ├── router/         # 路由
│   │   │   └── index.js    # 路由配置
│   │   ├── views/          # 视图
│   │   │   ├── AboutView.vue  # 关于页面
│   │   │   └── HomeView.vue  # 主页
│   │   ├── App.vue         # 根组件
│   │   └── main.js         # 前端入口文件
│   ├── .browserslistrc     # 浏览器兼容性配置
│   ├── .gitignore          # Git忽略文件
│   ├── README.md           # 前端README
│   ├── jsconfig.json       # JavaScript配置
│   ├── package-lock.json   # 依赖锁文件
│   └── package.json        # 前端依赖
├── README.md              # 项目说明
├── database_schema.sql     # 数据库结构SQL文件
├── package-lock.json       # 测试脚本依赖锁文件
├── package.json            # 测试脚本依赖
├── start.bat              # 一键启动脚本
└── test_api.js            # API测试脚本
```

## 目录和文件说明

### 后端部分

#### config/ 目录
- **config.js**: 数据库和服务器配置文件，包含数据库连接信息和服务器端口配置。

#### models/ 目录
- **db.js**: 数据库连接和初始化文件，负责创建数据库、表结构，添加字段，插入测试数据等。
- **Student.js**: 学生模型文件，封装了学生数据的业务逻辑，包括获取、添加、修改、删除学生等功能。

#### routes/ 目录
- **studentRoutes.js**: 学生相关API路由文件，处理前端发送的API请求，调用Student模型的方法处理业务逻辑。

#### utils/ 目录
- 目前为空，可用于存放工具函数。

#### 主文件
- **index.js**: 后端主入口文件，初始化Express应用，配置中间件，加载路由，启动服务器。

### 前端部分

#### public/ 目录
- **favicon.ico**: 网站图标。
- **index.html**: 前端入口HTML文件。

#### src/ 目录
- **assets/**: 静态资源目录，存放图片等文件。
- **components/**: 组件目录，包含以下组件：
  - **HelloWorld.vue**: 示例组件。
  - **StudentEdit.vue**: 编辑学生组件，用于修改学生信息。
  - **StudentInfo.vue**: 学生列表组件，显示所有学生成绩，支持按平均分排序。
  - **StudentInsert.vue**: 添加学生组件，用于添加新学生。
- **router/**: 路由目录，包含路由配置。
- **views/**: 视图目录，包含页面视图。
- **App.vue**: 根组件，包含应用的整体结构。
- **main.js**: 前端入口文件，初始化Vue应用，配置路由等。

### 项目根目录

- **README.md**: 项目说明文件，包含项目介绍、功能特性、安装运行说明等。
- **database_schema.sql**: 数据库结构SQL文件，包含完整的数据库初始化脚本。
- **start.bat**: 一键启动脚本，用于启动后端和前端服务器。
- **test_api.js**: API测试脚本，用于测试后端API功能。
- **package.json**: 测试脚本依赖配置文件。

## 功能模块说明

### 1. 数据库模块
- **自动初始化**: 后端启动时自动创建数据库、表结构，添加字段，插入测试数据。
- **数据模型**: 封装了学生数据的业务逻辑，提供CRUD操作。
- **数据验证**: 前端实现了学号和成绩的验证，确保数据的有效性。

### 2. API模块
- **获取学生列表**: 支持按平均分降序获取所有学生。
- **添加学生**: 支持添加新学生，自动计算总分和平均分。
- **修改学生**: 支持修改学生信息，自动重新计算总分和平均分。
- **删除学生**: 支持删除学生。
- **获取单个学生**: 支持根据ID获取单个学生信息。

### 3. 前端模块
- **学生列表**: 显示所有学生成绩，支持按平均分排序。
- **添加学生**: 支持添加新学生，包含学号和成绩验证。
- **编辑学生**: 支持修改学生信息，包含成绩验证。
- **删除学生**: 支持删除学生。
- **响应式设计**: 支持不同屏幕尺寸的显示。

### 4. 测试模块
- **API测试**: 测试后端API功能，包括添加、获取、修改、删除学生等。
- **数据验证测试**: 测试数据验证功能，确保数据的有效性。
- **排序测试**: 测试按平均分排序功能。

## 技术栈

- **前端**: Vue 3、Vue Router、Axios
- **后端**: Express、MySQL
- **构建工具**: Vue CLI
- **测试工具**: Node.js、Axios

## 安装和运行

### 安装依赖

```bash
# 安装后端依赖
cd backend && npm install

# 安装前端依赖
cd ../vuestu && npm install

# 安装测试脚本依赖
cd .. && npm install
```

### 运行项目

```bash
# 一键启动（推荐）
start.bat

# 手动启动
# 启动后端
cd backend && node index.js
# 启动前端
cd ../vuestu && npm run serve
```

### 运行测试

```bash
# 运行API测试脚本
node test_api.js
```

## 注意事项

- 确保MySQL服务正在运行
- 数据库连接信息在 `backend/config/config.js` 文件中配置
- 前端API调用地址在组件中硬编码为 `http://127.0.0.1:8081/`
- 学号必须是5位数字
- 成绩范围为0-100

## 总结

学生成绩管理系统采用了模块化的设计，将后端代码按照功能划分为配置、模型、路由等模块，前端代码按照组件化的思想进行组织。系统支持完整的学生成绩管理功能，包括添加、编辑、删除和查看学生成绩，具有良好的用户体验和数据验证机制。

项目结构清晰，代码组织合理，便于维护和扩展。通过一键启动脚本和API测试脚本，使得项目的运行和测试更加便捷。