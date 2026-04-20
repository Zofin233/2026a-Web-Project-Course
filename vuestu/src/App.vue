<template>
  <div id="app">
    <header class="app-header">
      <h1>学生成绩管理系统</h1>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default{
  name:'app'
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页面头部 */
.app-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin: 0;
}

/* 主内容区 */
.app-main {
  flex: 1;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 通用链接样式 */
a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #2980b9;
}

/* 通用按钮样式 */
button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
}

/* 删除按钮样式 */
.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 24px;
  }
  
  .app-main {
    padding: 20px 10px;
  }
}
</style>
