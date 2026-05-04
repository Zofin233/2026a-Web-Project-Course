# 学生成绩管理系统设计文档

---

## 2.1 数据库设计

### 2.1.1 数据库概述

本系统采用 MySQL 数据库管理系统，数据库名为 `vuestu`，包含一个核心数据表 `stuScore`，用于存储学生成绩信息。

### 2.1.2 数据表结构

#### stuScore 表（学生成绩表）

| 字段名 | 数据类型 | 约束 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `INT` | `PRIMARY KEY` | - | 学号，5位数字，唯一标识 |
| `name` | `VARCHAR(50)` | `NOT NULL` | - | 学生姓名 |
| `gender` | `BIT(1)` | `NOT NULL` | `0` | 性别：0-女，1-男 |
| `chinese` | `INT` | `NOT NULL` | `0` | 语文成绩，范围0-100 |
| `math` | `INT` | `NOT NULL` | `0` | 数学成绩，范围0-100 |
| `english` | `INT` | `NOT NULL` | `0` | 英语成绩，范围0-100 |
| `total` | `INT` | - | `0` | 总分，自动计算 |
| `average` | `DECIMAL(5,2)` | - | `0.00` | 平均分，自动计算 |

### 2.1.3 数据库初始化

系统支持自动数据库初始化，当后端服务器启动时，会自动执行以下操作：

1. **创建数据库**（如果不存在）
2. **创建表结构**（如果不存在）
3. **检查并添加字段**（如果不存在）：`gender`、`total`、`average` 字段
4. **插入测试数据**（如果表为空）
5. **计算并更新总分和平均分**

### 2.1.4 数据验证规则

| 字段 | 验证规则 | 错误提示 |
| :--- | :--- | :--- |
| `id` | 必须为5位数字 | 学号必须为5位数字 |
| `name` | 不能为空 | 姓名不能为空 |
| `chinese` | 必须在0-100之间 | 语文成绩必须在0-100之间 |
| `math` | 必须在0-100之间 | 数学成绩必须在0-100之间 |
| `english` | 必须在0-100之间 | 英语成绩必须在0-100之间 |

---

## 2.2 前后端接口设计

### 2.2.1 接口概述

本系统采用 RESTful API 设计风格，前端通过 HTTP 请求与后端进行数据交互。后端服务器运行在 `http://127.0.0.1:8081/`。

### 2.2.2 接口列表

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| `/list_user` | `GET` | 获取所有学生成绩（按平均分降序排列） |
| `/insert` | `POST` | 添加新学生成绩 |
| `/edit` | `POST` | 修改学生成绩 |
| `/delete/:id` | `DELETE` | 删除学生成绩 |
| `/get_user` | `GET` | 获取单个学生成绩 |

### 2.2.3 接口详细设计

| 接口 | URL | 方法 | 请求参数 | 响应格式 |
| :--- | :--- | :--- | :--- | :--- |
| 获取所有学生 | `/list_user` | `GET` | 无 | 学生数组 |
| 添加学生 | `/insert` | `POST` | `id, name, gender, chinese, math, english` | 成功/失败信息 |
| 修改学生 | `/edit` | `POST` | `id, name, gender, chinese, math, english` | 成功/失败信息 |
| 删除学生 | `/delete/:id` | `DELETE` | `id`（路径参数） | 成功/失败信息 |
| 获取单个学生 | `/get_user` | `GET` | `id`（查询参数） | 学生对象 |

### 2.2.4 错误处理

所有接口在发生错误时返回统一的错误格式：包含 `success` 字段（布尔值）和 `message` 字段（错误描述）。

---

## 2.3 后端设计

### 2.3.1 后端技术栈

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| Node.js | 14.x+ | 运行环境 |
| Express | 4.x | Web框架 |
| MySQL | 5.7+ | 数据库 |
| body-parser | 1.x | 请求体解析 |
| cors | 2.x | 跨域支持 |

### 2.3.2 项目结构

```
backend/
├── config/
│   └── config.js           # 数据库配置
├── models/
│   ├── db.js               # 数据库连接
│   └── Student.js          # 学生模型
├── routes/
│   └── studentRoutes.js    # API路由
├── index.js                # 入口文件
├── package.json
└── package-lock.json
```

### 2.3.3 模块设计

| 模块 | 功能 | 核心方法/配置 |
| :--- | :--- | :--- |
| **config/config.js** | 存储数据库连接信息和服务器配置 | 数据库地址、用户名、密码、端口 |
| **models/db.js** | 数据库连接管理和自动初始化 | `initDatabase()`、`connection` |
| **models/Student.js** | 封装学生数据的业务逻辑 | `getAll()`、`getById()`、`add()`、`update()`、`delete()` |
| **routes/studentRoutes.js** | 定义API接口路由 | 路由映射到对应的模型方法 |

### 2.3.4 入口文件（index.js）

**功能**：初始化Express应用，配置中间件，加载路由，启动服务器。

**启动流程**：加载配置 → 初始化数据库 → 配置中间件 → 注册路由 → 启动服务器

### 2.3.5 业务逻辑

**数据存储流程**：
- 添加学生：前端请求 → 验证数据 → 计算总分平均分 → 插入数据库 → 返回结果
- 修改学生：前端请求 → 验证数据 → 计算总分平均分 → 更新数据库 → 返回结果
- 删除学生：前端请求 → 验证ID → 删除记录 → 返回结果
- 查询学生：前端请求 → 查询数据库 → 转换性别字段 → 返回结果

**自动计算逻辑**：总分 = 语文 + 数学 + 英语；平均分 = 总分 / 3；性别转换：1→男，0→女

### 2.3.6 安全考虑

1. **输入验证**：前端已实现数据验证
2. **SQL注入防护**：使用参数化查询
3. **跨域支持**：配置CORS中间件
4. **错误处理**：统一错误响应格式

---

## 2.4 前端设计

### 2.4.1 前端技术栈

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| Vue | 3.x | 前端框架 |
| Vue Router | 4.x | 路由管理 |
| Axios | 0.27.x | HTTP客户端 |
| Vue CLI | 5.x | 构建工具 |

### 2.4.2 项目结构

```
vuestu/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StudentInfo.vue    # 学生列表组件
│   │   ├── StudentInsert.vue  # 添加学生组件
│   │   └── StudentEdit.vue    # 编辑学生组件
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── views/
│   │   └── HomeView.vue       # 主页
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── package.json
└── package-lock.json
```

### 2.4.3 路由设计

| 路径 | 名称 | 组件 | 功能 |
| :--- | :--- | :--- | :--- |
| `/` | 重定向 | - | 重定向到学生列表 |
| `/info` | StudentInfo | `StudentInfo.vue` | 显示学生列表 |
| `/insert` | StudentInsert | `StudentInsert.vue` | 添加新学生 |
| `/edit/:id` | StudentEdit | `StudentEdit.vue` | 编辑学生信息 |

### 2.4.4 组件设计

| 组件 | 功能 | 特点 |
| :--- | :--- | :--- |
| **StudentInfo.vue** | 显示学生列表，支持操作按钮 | 按平均分降序排列，提供添加、编辑、删除按钮 |
| **StudentInsert.vue** | 表单输入学生信息，数据验证 | 学号必须为5位数字，成绩范围0-100 |
| **StudentEdit.vue** | 修改学生信息，数据验证 | 学号只读，预填充现有数据 |

### 2.4.5 用户界面设计

**设计风格**：主色调为蓝色系（#42b983），白色背景，灰色边框，卡片式布局，响应式设计。

**页面布局**：
- 学生列表页面：顶部标题和操作按钮，中部学生成绩表格，底部分页导航（可选）
- 添加/编辑页面：顶部页面标题，中部表单区域，底部提交和取消按钮

### 2.4.6 数据验证

前端实现以下验证规则：
- 学号必须为5位数字
- 成绩必须在0-100之间
- 所有字段必填

---

## 3. 代码部分

### 3.1 数据库初始化代码

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS vuestu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建表结构
CREATE TABLE IF NOT EXISTS stuScore (
    id INT PRIMARY KEY COMMENT '学号，5位数字',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    gender BIT(1) NOT NULL DEFAULT 0 COMMENT '性别：0-女，1-男',
    chinese INT NOT NULL DEFAULT 0 COMMENT '语文成绩，范围0-100',
    math INT NOT NULL DEFAULT 0 COMMENT '数学成绩，范围0-100',
    english INT NOT NULL DEFAULT 0 COMMENT '英语成绩，范围0-100',
    total INT DEFAULT 0 COMMENT '总分',
    average DECIMAL(5,2) DEFAULT 0.00 COMMENT '平均分'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生成绩表';

-- 插入测试数据
INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES
(10001, '张三', 1, 85, 90, 95, 270, 90.00),
(10002, '李四', 0, 78, 82, 88, 248, 82.67),
(10003, '王五', 1, 92, 88, 90, 270, 90.00),
(10004, '赵六', 0, 65, 70, 72, 207, 69.00),
(10005, '孙七', 1, 88, 92, 85, 265, 88.33);

-- 更新总分和平均分
UPDATE stuScore SET total = chinese + math + english, average = (chinese + math + english) / 3;
```

### 3.2 后端配置代码

```javascript
// config/config.js
module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'vuestu'
    },
    server: {
        port: 8081,
        host: '127.0.0.1'
    }
};
```

### 3.3 后端入口代码

```javascript
// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const { initDatabase } = require('./models/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 路由
app.use('/', studentRoutes);

// 启动服务器
async function startServer() {
    await initDatabase();
    app.listen(config.server.port, config.server.host, () => {
        console.log(`服务器运行在 http://${config.server.host}:${config.server.port}`);
    });
}

startServer();
```

### 3.4 后端模型代码

```javascript
// models/Student.js
const { connection } = require('./db');

class Student {
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM stuScore ORDER BY average DESC', (error, results) => {
                if (error) reject(error);
                results.forEach(s => s.gender = s.gender === 1 ? '男' : '女');
                resolve(results);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM stuScore WHERE id = ?', [id], (error, results) => {
                if (error) reject(error);
                if (results[0]) results[0].gender = results[0].gender === 1 ? '男' : '女';
                resolve(results[0] || null);
            });
        });
    }

    static add(data) {
        const { id, name, gender, chinese, math, english } = data;
        const total = parseInt(chinese) + parseInt(math) + parseInt(english);
        const average = total / 3;
        
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, name, gender === '男' ? 1 : 0, chinese, math, english, total, average],
                (error, results) => {
                    if (error) reject(error);
                    resolve({ success: true, message: '添加成功', id: results.insertId });
                }
            );
        });
    }

    static update(data) {
        const { id, name, gender, chinese, math, english } = data;
        const total = parseInt(chinese) + parseInt(math) + parseInt(english);
        const average = total / 3;
        
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE stuScore SET name = ?, gender = ?, chinese = ?, math = ?, english = ?, total = ?, average = ? WHERE id = ?',
                [name, gender === '男' ? 1 : 0, chinese, math, english, total, average, id],
                (error, results) => {
                    if (error) reject(error);
                    resolve({ success: true, message: '修改成功', affectedRows: results.affectedRows });
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM stuScore WHERE id = ?', [id], (error, results) => {
                if (error) reject(error);
                resolve({ success: true, message: '删除成功', affectedRows: results.affectedRows });
            });
        });
    }
}

module.exports = Student;
```

### 3.5 前端路由配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import StudentInfo from '@/components/StudentInfo';
import StudentInsert from '@/components/StudentInsert';
import StudentEdit from '@/components/StudentEdit';

const routes = [
    { path: '/', redirect: '/info' },
    { path: '/info', name: 'StudentInfo', component: StudentInfo },
    { path: '/insert', name: 'StudentInsert', component: StudentInsert },
    { path: '/edit/:id', name: 'StudentEdit', component: StudentEdit }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
```

### 3.6 前端数据验证代码

```javascript
// 学号验证
const isValidId = (id) => {
    return /^\d{5}$/.test(id);
};

// 成绩验证
const isValidScore = (score) => {
    const num = parseInt(score);
    return !isNaN(num) && num >= 0 && num <= 100;
};

// 表单验证
const validateForm = (form) => {
    const errors = [];
    
    if (!form.id || !isValidId(form.id)) {
        errors.push('学号必须为5位数字');
    }
    if (!form.name) {
        errors.push('姓名不能为空');
    }
    if (!isValidScore(form.chinese)) {
        errors.push('语文成绩必须在0-100之间');
    }
    if (!isValidScore(form.math)) {
        errors.push('数学成绩必须在0-100之间');
    }
    if (!isValidScore(form.english)) {
        errors.push('英语成绩必须在0-100之间');
    }
    
    return errors;
};
```

### 3.7 API接口响应示例

**成功响应**：
```json
{
    "success": true,
    "message": "操作成功",
    "data": { /* 返回的数据 */ }
}
```

**失败响应**：
```json
{
    "success": false,
    "message": "错误描述"
}
```

---

## 附录

### 文件清单

| 文件路径 | 说明 |
| :--- | :--- |
| `backend/config/config.js` | 数据库配置 |
| `backend/models/db.js` | 数据库连接 |
| `backend/models/Student.js` | 学生模型 |
| `backend/routes/studentRoutes.js` | API路由 |
| `backend/index.js` | 后端入口 |
| `vuestu/src/router/index.js` | 前端路由 |
| `vuestu/src/components/StudentInfo.vue` | 学生列表组件 |
| `vuestu/src/components/StudentInsert.vue` | 添加学生组件 |
| `vuestu/src/components/StudentEdit.vue` | 编辑学生组件 |
| `database_schema.sql` | 数据库初始化脚本 |