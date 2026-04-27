const mysql = require('mysql');
const config = require('./../config/config');

// 创建数据库连接
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password
});

// 数据库初始化函数
function initDatabase() {
    return new Promise((resolve, reject) => {
        // 连接数据库
        connection.connect((err) => {
            if (err) {
                console.error('数据库连接失败:', err);
                reject(err);
                return;
            }
            console.log('数据库连接成功');
            
            // 创建数据库（如果不存在）
            connection.query('CREATE DATABASE IF NOT EXISTS vuestu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;', (error, results, fields) => {
                if (error) {
                    console.error('创建数据库失败:', error);
                    reject(error);
                    return;
                }
                console.log('数据库创建/检查成功');
                
                // 切换到vuestu数据库
                connection.changeUser({ database: 'vuestu' }, (error) => {
                    if (error) {
                        console.error('切换数据库失败:', error);
                        reject(error);
                        return;
                    }
                    console.log('切换到vuestu数据库成功');
                    
                    // 创建学生成绩表（如果不存在）
                    connection.query(`
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
                    `, (error, results, fields) => {
                        if (error) {
                            console.error('创建表失败:', error);
                            reject(error);
                            return;
                        }
                        console.log('表创建/检查成功');
                        
                        // 检查并添加字段（如果不存在）
                        const checkFields = [
                            { name: 'gender', sql: 'ALTER TABLE stuScore ADD COLUMN gender BIT(1) NOT NULL DEFAULT 0;' },
                            { name: 'total', sql: 'ALTER TABLE stuScore ADD COLUMN total INT DEFAULT 0;' },
                            { name: 'average', sql: 'ALTER TABLE stuScore ADD COLUMN average DECIMAL(5,2) DEFAULT 0.00;' }
                        ];
                        
                        let fieldChecks = 0;
                        checkFields.forEach(field => {
                            connection.query(`SHOW COLUMNS FROM stuScore LIKE "${field.name}";`, (error, results, fields) => {
                                if (error) {
                                    console.error(`检查${field.name}字段失败:`, error);
                                } else if (results.length === 0) {
                                    connection.query(field.sql, (error, results, fields) => {
                                        if (error) {
                                            console.error(`添加${field.name}字段失败:`, error);
                                        }
                                    });
                                }
                                
                                fieldChecks++;
                                if (fieldChecks === checkFields.length) {
                                    // 插入测试数据（如果表为空）
                                    connection.query('SELECT COUNT(*) as count FROM stuScore;', (error, results, fields) => {
                                        if (error) {
                                            console.error('检查数据数量失败:', error);
                                        } else if (results[0].count === 0) {
                                            connection.query(`
                                                INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES
                                                (10001, '张三', 1, 85, 90, 95, 270, 90.00),
                                                (10002, '李四', 0, 78, 82, 88, 248, 82.67),
                                                (10003, '王五', 1, 92, 88, 90, 270, 90.00),
                                                (10004, '赵六', 0, 65, 70, 72, 207, 69.00),
                                                (10005, '孙七', 1, 88, 92, 85, 265, 88.33);
                                            `, (error, results, fields) => {
                                                if (error) {
                                                    console.error('插入测试数据失败:', error);
                                                } else {
                                                    console.log('插入测试数据成功');
                                                }
                                            });
                                        }
                                    });
                                    
                                    // 更新现有数据的总分和平均分
                                    connection.query('UPDATE stuScore SET total = chinese + math + english, average = (chinese + math + english) / 3;', (error, results, fields) => {
                                        if (error) {
                                            console.error('更新总分和平均分失败:', error);
                                        } else {
                                            console.log('更新总分和平均分成功');
                                        }
                                    });
                                    
                                    resolve(connection);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

// 导出数据库连接和初始化函数
module.exports = {
    connection,
    initDatabase
};