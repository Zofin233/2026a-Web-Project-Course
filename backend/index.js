var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//创建数据库连接
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "vuestu",
});
connection.connect();

// 检查并修改数据库结构
connection.query("ALTER TABLE stuScore ADD COLUMN gender BIT(1);", function(error, results, fields) {
    if (error) console.error("添加gender字段失败:", error);
});

connection.query("ALTER TABLE stuScore ADD COLUMN total INT;", function(error, results, fields) {
    if (error) console.error("添加total字段失败:", error);
});

connection.query("ALTER TABLE stuScore ADD COLUMN average DECIMAL(5,2);", function(error, results, fields) {
    if (error) console.error("添加average字段失败:", error);
});

// 更新现有数据的总分和平均分
connection.query("UPDATE stuScore SET total = chinese + math + english, average = (chinese + math + english) / 3;", function(error, results, fields) {
    if (error) console.error("更新总分和平均分失败:", error);
});

// 测试主页输出 成绩表中所有数据
app.get("/", function(req, res) {
    console.log("主页 GET 请求");

    connection.query("SELECT * FROM stuScore", function(error, results, fields) {
        if (error) throw error;
        console.log("The result is: ", results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
});

// 获取所有学生成绩
app.get("/list_user", function(req, res) {
    console.log("/list_user GET 请求");
    connection.query("SELECT * FROM stuScore ORDER BY average DESC", function(error, results, fields) {
        if (error) throw error;
        // 转换性别字段
        results.forEach(function(student) {
            student.gender = student.gender === 1 ? '男' : '女';
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
});

// 添加学生成绩
app.post("/insert", function(req, res) {
    console.log("/insert POST 请求");
    var { id, name, gender, chinese, math, english } = req.body;
    var total = parseInt(chinese) + parseInt(math) + parseInt(english);
    var average = total / 3;
    
    var sql = "INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [id, name, gender === '男' ? 1 : 0, chinese, math, english, total, average];
    
    connection.query(sql, values, function(error, results, fields) {
        if (error) throw error;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: "添加成功", id: results.insertId }));
    });
});

// 修改学生成绩
app.post("/edit", function(req, res) {
    console.log("/edit POST 请求");
    var { id, name, gender, chinese, math, english } = req.body;
    var total = parseInt(chinese) + parseInt(math) + parseInt(english);
    var average = total / 3;
    
    var sql = "UPDATE stuScore SET name=?, gender=?, chinese=?, math=?, english=?, total=?, average=? WHERE id=?";
    var values = [name, gender === '男' ? 1 : 0, chinese, math, english, total, average, id];
    
    connection.query(sql, values, function(error, results, fields) {
        if (error) throw error;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: "修改成功", affectedRows: results.affectedRows }));
    });
});

// 删除学生成绩
app.delete("/delete/:id", function(req, res) {
    console.log("/delete/:id DELETE 请求");
    var id = req.params.id;
    
    var sql = "DELETE FROM stuScore WHERE id=?";
    
    connection.query(sql, [id], function(error, results, fields) {
        if (error) throw error;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: "删除成功", affectedRows: results.affectedRows }));
    });
});

// 获取单个学生成绩
app.get("/get_user", function(req, res) {
    console.log("/get_user GET 请求");
    var id = req.query.id;
    
    var sql = "SELECT * FROM stuScore WHERE id=?";
    
    connection.query(sql, [id], function(error, results, fields) {
        if (error) throw error;
        // 转换性别字段
        if (results[0]) {
            results[0].gender = results[0].gender === 1 ? '男' : '女';
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results[0]));
    });
});

var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});