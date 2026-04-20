var express = require("express");
const cors = require("cors");
var mysql = require("mysql");
var app = express();
app.use("/public", express.static("public"));
app.use(cors());

//创建数据库连接
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "vuestu",
});
connection.connect();
//  测试主页输出 成绩表中所有数据
app.get("/", function(req, res) {
    console.log("主页 GET 请求");

    connection.query("SELECT * FROM stuScore", function(error, results, fields) {
        if (error) throw error;
        console.log("The result is: ", results[0]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results[0]));
    });

    // res.send("Hello GET");

});

//  POST 请求，请补充完成
app.post("/", function(req, res) {
    console.log("主页 POST 请求");
    res.send("Hello POST");
});

//  /del_user 页面响应，请补充完成
app.get("/del_user", function(req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send("删除学生成绩页面");
});

//  /list_user 页面 GET 请求，请补充完成
app.get("/list_user", function(req, res) {
    console.log("/list_user GET 请求");
    res.send("成绩列表页面");
});

//  /update_user 页面 POST 请求，请补充完成
app.post("/update_user", function(req, res) {
    console.log("/update_user Post 请求");
    res.send("修改成绩页面");
});

var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

// connection.end();