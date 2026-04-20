@echo off

echo 学生成绩管理系统一键启动脚本
echo ===============================
echo.

:: 启动后端服务器
echo 启动后端服务器...
start "后端服务器" cmd /k "cd backend && node express_index2.js"

:: 等待2秒，确保后端服务器有足够的启动时间
ping 127.0.0.1 -n 3 > nul

:: 启动前端服务器
echo 启动前端服务器...
start "前端服务器" cmd /k "cd vuestu && npm run serve"

echo.
echo 系统启动完成！
echo 后端服务器地址: http://127.0.0.1:8081/
echo 前端服务器地址: http://localhost:8080/ (或其他可用端口)
echo.
echo 请在浏览器中访问前端服务器地址以使用系统。
echo 按任意键退出...
pause > nul
