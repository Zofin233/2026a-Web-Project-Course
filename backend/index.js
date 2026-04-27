const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const { initDatabase } = require('./models/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// 中间件
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 路由
app.use('/', studentRoutes);

// 测试主页
app.get('/', async (req, res) => {
    try {
        const { connection } = require('./models/db');
        connection.query('SELECT * FROM stuScore ORDER BY average DESC', (error, results, fields) => {
            if (error) {
                res.status(500).json({ success: false, message: '获取数据失败' });
                return;
            }
            // 转换性别字段
            results.forEach(student => {
                student.gender = student.gender === 1 ? '男' : '女';
            });
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 初始化数据库并启动服务器
async function startServer() {
    try {
        await initDatabase();
        
        const server = app.listen(config.server.port, config.server.host, () => {
            const host = server.address().address;
            const port = server.address().port;
            console.log(`应用实例，访问地址为 http://${host}:${port}`);
        });
    } catch (error) {
        console.error('启动服务器失败:', error);
        process.exit(1);
    }
}

// 启动服务器
startServer();