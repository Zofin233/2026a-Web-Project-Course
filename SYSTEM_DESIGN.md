# 学生成绩管理系统设计文档

## 1. 数据库设计

### 1.1 数据库概述

本系统采用 MySQL 数据库管理系统，数据库名为 `vuestu`，包含一个核心数据表 `stuScore`，用于存储学生成绩信息。

### 1.2 数据表结构

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

### 1.3 数据库初始化

系统支持自动数据库初始化，当后端服务器启动时，会自动执行以下操作：

1. **创建数据库**（如果不存在）：
```sql
CREATE DATABASE IF NOT EXISTS vuestu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **创建表结构**（如果不存在）：
```sql
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
```

3. **检查并添加字段**（如果不存在）：
    - `gender` 字段
    - `total` 字段
    - `average` 字段

4. **插入测试数据**（如果表为空）：
```sql
INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES
(10001, '张三', 1, 85, 90, 95, 270, 90.00),
(10002, '李四', 0, 78, 82, 88, 248, 82.67),
(10003, '王五', 1, 92, 88, 90, 270, 90.00),
(10004, '赵六', 0, 65, 70, 72, 207, 69.00),
(10005, '孙七', 1, 88, 92, 85, 265, 88.33);
```

5. **计算并更新总分和平均分**：
```sql
UPDATE stuScore SET total = chinese + math + english, average = (chinese + math + english) / 3;
```

### 1.4 数据验证规则

| 字段 | 验证规则 | 错误提示 |
| :--- | :--- | :--- |
| `id` | 必须为5位数字 | 学号必须为5位数字 |
| `name` | 不能为空 | 姓名不能为空 |
| `chinese` | 必须在0-100之间 | 语文成绩必须在0-100之间 |
| `math` | 必须在0-100之间 | 数学成绩必须在0-100之间 |
| `english` | 必须在0-100之间 | 英语成绩必须在0-100之间 |

---

## 2. 前后端接口设计

### 2.1 接口概述

本系统采用 RESTful API 设计风格，前端通过 HTTP 请求与后端进行数据交互。后端服务器运行在 `http://127.0.0.1:8081/`。

### 2.2 接口列表

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| `/list_user` | `GET` | 获取所有学生成绩（按平均分降序排列） |
| `/insert` | `POST` | 添加新学生成绩 |
| `/edit` | `POST` | 修改学生成绩 |
| `/delete/:id` | `DELETE` | 删除学生成绩 |
| `/get_user` | `GET` | 获取单个学生成绩 |

### 2.3 接口详细设计

#### 2.3.1 获取所有学生成绩

- **URL**: `/list_user`
- **方法**: `GET`
- **请求参数**: 无
- **响应格式**:
```json
[
    {
        "id": 10001,
        "name": "张三",
        "gender": "男",
        "chinese": 85,
        "math": 90,
        "english": 95,
        "total": 270,
        "average": 90.00
    }
]
```

#### 2.3.2 添加学生成绩

- **URL**: `/insert`
- **方法**: `POST`
- **请求体**:
```json
{
    "id": 10006,
    "name": "新学生",
    "gender": "男",
    "chinese": 80,
    "math": 85,
    "english": 90
}
```
- **响应格式**:
```json
{
    "success": true,
    "message": "添加成功",
    "id": 10006
}
```

#### 2.3.3 修改学生成绩

- **URL**: `/edit`
- **方法**: `POST`
- **请求体**:
```json
{
    "id": 10001,
    "name": "张三（修改）",
    "gender": "男",
    "chinese": 90,
    "math": 95,
    "english": 100
}
```
- **响应格式**:
```json
{
    "success": true,
    "message": "修改成功",
    "affectedRows": 1
}
```

#### 2.3.4 删除学生成绩

- **URL**: `/delete/:id`
- **方法**: `DELETE`
- **路径参数**: `id` - 学生学号
- **响应格式**:
```json
{
    "success": true,
    "message": "删除成功",
    "affectedRows": 1
}
```

#### 2.3.5 获取单个学生成绩

- **URL**: `/get_user?id=10001`
- **方法**: `GET`
- **查询参数**: `id` - 学生学号
- **响应格式**:
```json
{
    "id": 10001,
    "name": "张三",
    "gender": "男",
    "chinese": 85,
    "math": 90,
    "english": 95,
    "total": 270,
    "average": 90.00
}
```

### 2.4 错误处理

所有接口在发生错误时返回统一的错误格式：
```json
{
    "success": false,
    "message": "错误描述"
}
```

---

## 3. 前端设计

### 3.1 前端技术栈

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| Vue | 3.x | 前端框架 |
| Vue Router | 4.x | 路由管理 |
| Axios | 0.27.x | HTTP客户端 |
| Vue CLI | 5.x | 构建工具 |

### 3.2 项目结构

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

### 3.3 路由设计

| 路径 | 名称 | 组件 | 功能 |
| :--- | :--- | :--- | :--- |
| `/` | 重定向 | - | 重定向到学生列表 |
| `/info` | StudentInfo | `StudentInfo.vue` | 显示学生列表 |
| `/insert` | StudentInsert | `StudentInsert.vue` | 添加新学生 |
| `/edit/:id` | StudentEdit | `StudentEdit.vue` | 编辑学生信息 |

### 3.4 组件设计

#### 3.4.1 StudentInfo.vue（学生列表组件）

**功能**：
- 显示所有学生成绩列表
- 支持按平均分降序排列
- 提供添加、编辑、删除操作按钮

**布局**：
- 顶部标题栏
- 操作按钮区（添加学生）
- 学生成绩表格
- 分页功能（可选）

#### 3.4.2 StudentInsert.vue（添加学生组件）

**功能**：
- 表单输入学生信息
- 数据验证（学号、成绩范围）
- 提交数据到后端

**表单字段**：
| 字段 | 类型 | 验证规则 |
| :--- | :--- | :--- |
| 学号 | 文本输入 | 必须为5位数字 |
| 姓名 | 文本输入 | 不能为空 |
| 性别 | 选择框 | 男/女 |
| 语文成绩 | 数字输入 | 0-100 |
| 数学成绩 | 数字输入 | 0-100 |
| 英语成绩 | 数字输入 | 0-100 |

#### 3.4.3 StudentEdit.vue（编辑学生组件）

**功能**：
- 加载并显示学生信息
- 修改学生成绩
- 数据验证
- 提交修改到后端

**特点**：
- 学号字段只读（不可修改）
- 预填充现有数据
- 与添加学生页面保持一致的验证规则

### 3.5 用户界面设计

#### 3.5.1 设计风格

- **主色调**: 蓝色系（#42b983）
- **辅助色**: 白色背景，灰色边框
- **字体**: 微软雅黑/宋体
- **布局**: 卡片式布局，响应式设计

#### 3.5.2 页面预览

**学生列表页面**：
- 顶部：系统标题和操作按钮
- 中部：学生成绩表格（学号、姓名、性别、各科成绩、总分、平均分、操作）
- 底部：分页导航（可选）

**添加/编辑页面**：
- 顶部：页面标题
- 中部：表单区域（标签+输入框布局）
- 底部：提交和取消按钮

### 3.6 数据验证

前端实现以下验证规则：

1. **学号验证**：
```javascript
const isValidId = (id) => {
    return /^\d{5}$/.test(id);
};
```

2. **成绩验证**：
```javascript
const isValidScore = (score) => {
    const num = parseInt(score);
    return !isNaN(num) && num >= 0 && num <= 100;
};
```

3. **表单验证**：
- 所有字段必填
- 学号必须为5位数字
- 成绩必须在0-100之间

---

## 4. 后端设计

### 4.1 后端技术栈

| 技术 | 版本 | 说明 |
| :--- | :--- | :--- |
| Node.js | 14.x+ | 运行环境 |
| Express | 4.x | Web框架 |
| MySQL | 5.7+ | 数据库 |
| body-parser | 1.x | 请求体解析 |
| cors | 2.x | 跨域支持 |

### 4.2 项目结构

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

### 4.3 模块设计

#### 4.3.1 配置模块（config/config.js）

**功能**：存储数据库连接信息和服务器配置

**内容**：
```javascript
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

#### 4.3.2 数据库模块（models/db.js）

**功能**：
- 数据库连接管理
- 自动数据库初始化
- 表结构创建
- 测试数据插入

**核心方法**：
- `initDatabase()`: 初始化数据库
- `connection`: 数据库连接对象

#### 4.3.3 模型模块（models/Student.js）

**功能**：封装学生数据的业务逻辑

**核心方法**：
- `getAll()`: 获取所有学生（按平均分降序）
- `getById(id)`: 根据ID获取学生
- `add(studentData)`: 添加学生
- `update(studentData)`: 更新学生
- `delete(id)`: 删除学生

**数据转换**：
- 将数据库中的 `gender`（BIT类型）转换为中文（男/女）
- 自动计算总分和平均分

#### 4.3.4 路由模块（routes/studentRoutes.js）

**功能**：定义API接口路由

**路由映射**：
| 路由 | 方法 | 处理函数 |
| :--- | :--- | :--- |
| `/list_user` | `GET` | `Student.getAll()` |
| `/insert` | `POST` | `Student.add()` |
| `/edit` | `POST` | `Student.update()` |
| `/delete/:id` | `DELETE` | `Student.delete()` |
| `/get_user` | `GET` | `Student.getById()` |

### 4.4 入口文件（index.js）

**功能**：
- 初始化Express应用
- 配置中间件（body-parser、cors）
- 加载路由
- 启动服务器

**启动流程**：
1. 加载配置
2. 初始化数据库
3. 配置中间件
4. 注册路由
5. 启动服务器

### 4.5 业务逻辑

#### 4.5.1 数据存储流程

1. **添加学生**：
```
前端请求 → 验证数据 → 计算总分平均分 → 插入数据库 → 返回结果
```

2. **修改学生**：
```
前端请求 → 验证数据 → 计算总分平均分 → 更新数据库 → 返回结果
```

3. **删除学生**：
```
前端请求 → 验证ID → 删除记录 → 返回结果
```

4. **查询学生**：
```
前端请求 → 查询数据库 → 转换性别字段 → 返回结果
```

#### 4.5.2 自动计算逻辑

**总分计算**：
```javascript
total = chinese + math + english;
```

**平均分计算**：
```javascript
average = total / 3;
```

**性别转换**：
```javascript
gender = gender === 1 ? '男' : '女';
```

### 4.6 安全考虑

1. **输入验证**：前端已实现数据验证
2. **SQL注入防护**：使用参数化查询
3. **跨域支持**：配置CORS中间件
4. **错误处理**：统一错误响应格式

---

## 总结

本学生成绩管理系统采用前后端分离架构，具有以下特点：

1. **数据库设计**：合理的表结构，支持自动初始化和数据验证
2. **接口设计**：RESTful API设计，清晰的请求响应格式
3. **前端设计**：组件化开发，良好的用户体验和数据验证
4. **后端设计**：模块化架构，业务逻辑与数据访问分离

系统功能完整，包括学生成绩的添加、查询、修改、删除操作，支持按平均分排序，具有良好的可扩展性和维护性。