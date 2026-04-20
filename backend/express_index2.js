//引入相关依赖
var express = require("express");
const cors = require("cors");
var mysql = require("mysql");
//创建app实例
var app = express();
//挂载相关方法
app.use(express.json());
//app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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



//增加信息POST请求
app.post("/insert", (req, res) => {
    console.log("添加信息post请求");
    const { id, name, gender, chinese, math, english } = req.body;
    sql = "INSERT INTO stuScore (id,name,gender,chinese,math,english) VALUES(?,?,?,?,?,?)";
    value = [id, name, gender, chinese, math, english];
    connection.query(sql, value, (error) => {
        if (error) throw error;
        console.log("添加成功");
        res.send("添加成功");
    })
})

//  删除DELETE请求，根据id删除信息
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM stuScore WHERE id = ?";
    const value = [id];
    connection.query(sql, value, (error) => {
        if (error) throw error;
        console.log("删除成功");
        res.send("删除成功");
    })
});

//编辑信息POST请求
app.post("/edit", (req, res) => {
    console.log("更新信息POST请求");
    const { id, name, gender, chinese, math, english } = req.body;
    //const id = req.params.id;
    sql = "UPDATE stuScore SET id = ?,name = ?,gender = ?,chinese = ?,math = ?,english = ? WHERE id = ?";
    value = [id, name, gender, chinese, math, english, id];
    connection.query(sql, value, (error) => {
        if (error) throw error;
        console.log("编辑成功");
        res.send("编辑成功");
    })
})



//  /list_user 页面 GET 请求，请补充完成
app.get("/list_user", function(req, res) {
    console.log("主页GET请求");
    const sql = "SELECT * FROM stuScore";
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        console.log("The result is ", results);
        res.json(results);
    });
});



var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

// connection.end();