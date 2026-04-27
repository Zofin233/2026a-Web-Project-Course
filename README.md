# 学生成绩管理系统

## 项目介绍

学生成绩管理系统是一个基于Vue 3和Express的全栈应用，用于管理学生的成绩信息。系统支持添加、编辑、删除和查看学生成绩，具有美观的用户界面和流畅的交互体验。

## 技术栈

- **前端**：Vue 3、Vue Router、Axios
- **后端**：Express、MySQL
- **构建工具**：Vue CLI

## 项目结构

```
student-score-system/
├── backend/               # 后端代码
│   ├── express_index2.js  # 后端主入口文件
│   ├── package.json       # 后端依赖
├── vuestu/                # 前端代码
│   ├── public/            # 静态资源
│   ├── src/               # 源代码
│   │   ├── components/    # 组件
│   │   ├── router/        # 路由
│   │   ├── views/         # 视图
│   │   ├── App.vue        # 根组件
│   │   ├── main.js        # 入口文件
│   ├── package.json       # 前端依赖
├── README.md              # 项目说明
```

## 功能特性

- ✅ 查看所有学生成绩（按平均分由高到低排序）
- ✅ 添加新学生成绩（包含学号、成绩验证）
- ✅ 编辑现有学生成绩
- ✅ 删除学生成绩
- ✅ 学号限定为5位数字的验证和提示
- ✅ 成绩范围为[0，100]的验证和提示
- ✅ 性别转为男女选择
- ✅ 显示总分和平均分字段
- ✅ 美观的用户界面
- ✅ 响应式设计
- ✅ 流畅的交互体验
- ✅ 自动数据库初始化
- ✅ API测试脚本

## 安装与运行

### 前置条件

- Node.js 14+
- MySQL 5.7+

### 数据库设置

1. 创建数据库：
   ```sql
   CREATE DATABASE vuestu;
   ```

2. 创建学生成绩表：
   ```sql
   CREATE TABLE stuScore (
     id INT PRIMARY KEY,
     name VARCHAR(50),
     gender VARCHAR(10),
     chinese INT,
     math INT,
     english INT
   );
   ```

3. 插入测试数据（可选）：
   ```sql
   INSERT INTO stuScore (id, name, gender, chinese, math, english) VALUES
   (111, 'lsq', 'fm', 100, 100, 100),
   (2, 'dqr', 'sf', 12, 34, 12);
   ```

### 方法一：一键启动（推荐）

1. 确保已安装所有依赖（首次运行时需要）：
   ```bash
   # 安装后端依赖
   cd backend && npm install
   # 安装前端依赖
   cd ../vuestu && npm install
   # 安装测试脚本依赖
   cd .. && npm install
   ```

2. 运行一键启动脚本：
   ```bash
   # 在项目根目录运行
   start.bat
   ```

   脚本会自动启动后端和前端服务器。

### 方法二：手动启动

#### 后端安装与运行

1. 进入后端目录：
   ```bash
   cd backend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行后端服务器：
   ```bash
   node express_index2.js
   ```

   后端服务器将运行在 http://127.0.0.1:8081/

#### 前端安装与运行

1. 进入前端目录：
   ```bash
   cd vuestu
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行前端开发服务器：
   ```bash
   npm run serve
   ```

   前端服务器将运行在 http://localhost:8080/（或其他可用端口）

## API 接口

### 1. 获取所有学生成绩
- **URL**: `/list_user`
- **方法**: `GET`
- **响应**: 学生成绩列表

### 2. 添加学生成绩
- **URL**: `/insert`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "id": "123",
    "name": "张三",
    "gender": "男",
    "chinese": 90,
    "math": 85,
    "english": 95
  }
  ```

### 3. 编辑学生成绩
- **URL**: `/edit`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "id": "123",
    "name": "张三",
    "gender": "男",
    "chinese": 95,
    "math": 90,
    "english": 100
  }
  ```

### 4. 删除学生成绩
- **URL**: `/delete/:id`
- **方法**: `DELETE`
- **参数**: `id` - 学生ID

## 项目预览

### 学生成绩表页面
![学生成绩表页面](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20score%20management%20system%20table%20page%20with%20modern%20design&image_size=landscape_16_9)

### 添加学生页面
![添加学生页面](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20score%20management%20system%20add%20page%20with%20modern%20form&image_size=landscape_16_9)

### 编辑学生页面
![编辑学生页面](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20score%20management%20system%20edit%20page%20with%20modern%20form&image_size=landscape_16_9)

## 注意事项

- 确保MySQL服务正在运行
- 确保后端服务器和前端服务器都已启动
- 数据库连接信息在 `backend/express_index2.js` 文件中配置
- 前端API调用地址在组件中硬编码为 `http://127.0.0.1:8081/`

## API测试

### 测试脚本功能

项目包含一个API测试脚本 `test_api.js`，用于测试后端API功能，包括：

- ✅ 添加学生（有效和无效数据）
- ✅ 获取所有学生（按平均分降序排列）
- ✅ 修改学生信息
- ✅ 删除学生
- ✅ 验证总分和平均分计算
- ✅ 验证按平均分排序

### 运行测试脚本

1. 确保后端服务器已经启动
2. 运行测试脚本：
   ```bash
   # 在项目根目录运行
   node test_api.js
   ```

测试脚本会自动执行所有测试用例，并显示详细的测试结果。

## 数据库初始化

项目支持自动数据库初始化，当后端服务器启动时，会自动：

- ✅ 创建数据库（如果不存在）
- ✅ 创建表结构（如果不存在）
- ✅ 添加必要的字段（如果不存在）
- ✅ 插入测试数据（如果表为空）
- ✅ 计算并更新总分和平均分

## 许可证

MIT
