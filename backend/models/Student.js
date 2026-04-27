const { connection } = require('./db');

// 学生模型
class Student {
    // 获取所有学生（按平均分降序）
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM stuScore ORDER BY average DESC', (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                // 转换性别字段
                results.forEach(student => {
                    student.gender = student.gender === 1 ? '男' : '女';
                });
                resolve(results);
            });
        });
    }

    // 根据ID获取学生
    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM stuScore WHERE id = ?', [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    // 转换性别字段
                    results[0].gender = results[0].gender === 1 ? '男' : '女';
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    // 添加学生
    static add(studentData) {
        return new Promise((resolve, reject) => {
            const { id, name, gender, chinese, math, english } = studentData;
            const total = parseInt(chinese) + parseInt(math) + parseInt(english);
            const average = total / 3;
            
            connection.query(
                'INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, name, gender === '男' ? 1 : 0, chinese, math, english, total, average],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve({ success: true, message: '添加成功', id: results.insertId });
                }
            );
        });
    }

    // 更新学生
    static update(studentData) {
        return new Promise((resolve, reject) => {
            const { id, name, gender, chinese, math, english } = studentData;
            const total = parseInt(chinese) + parseInt(math) + parseInt(english);
            const average = total / 3;
            
            connection.query(
                'UPDATE stuScore SET name = ?, gender = ?, chinese = ?, math = ?, english = ?, total = ?, average = ? WHERE id = ?',
                [name, gender === '男' ? 1 : 0, chinese, math, english, total, average, id],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve({ success: true, message: '修改成功', affectedRows: results.affectedRows });
                }
            );
        });
    }

    // 删除学生
    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM stuScore WHERE id = ?', [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: '删除成功', affectedRows: results.affectedRows });
            });
        });
    }
}

module.exports = Student;