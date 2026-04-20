<template>
  <div class="student-info">
    <div class="page-header">
      <h3>{{ msg }}</h3>
      <h4>学生成绩表</h4>
      <router-link to="/insert" class="btn-primary">添加学生</router-link>
    </div>
    <div class="table-container">
      <table class="student-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>语文</th>
            <th>数学</th>
            <th>英语</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, index) in students" :key="index" class="table-row">
            <td>{{ index+1 }}</td>
            <td>{{ s.id }}</td>
            <td>{{ s.name }}</td>
            <td>{{ s.gender }}</td>
            <td>{{ s.chinese }}</td>
            <td>{{ s.math }}</td>
            <td>{{ s.english }}</td>
            <td class="action-buttons">
              <router-link :to="'/edit/' + s.id" class="btn-edit">编辑</router-link>
              <button @click="del(s.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="students.length === 0" class="empty-state">
        <p>暂无学生数据</p>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      msg: "Welcome to Student Management App",
    };
  },
  computed: {
    stu: function () {
      let len = localStorage.length;
      let stuinfo;
      let stu = Array();
      for (let i = 0; i < len; i++) {
        let stukey = localStorage.key(i);
        if (stukey.substring(0, 3) == "stu") {
          stuinfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
          stu.push(stuinfo);
        }
      }
      return stu;
    },
  },
  methods: {
    del_stu_info: function (stuid) {
      localStorage.removeItem("stu" + stuid);
    },
  },
};
</script> -->
<script setup>
import axios from 'axios';
import { ref, computed } from "vue";

const msg = "Welcome to Student Management App";
const students = ref([]);

// 获取数据
axios.get("http://127.0.0.1:8081/list_user")
  .then(response => students.value = response.data)
  .catch(error => console.error("获取学生数据出错:", error));

const formData = computed(() => {
  return students.value.map(s => ({
    id: s.id,
    name: s.name,
    gender: s.gender,
    age: s.age,
    chinese: s.chinese,
    math: s.math,
    english: s.english
  }));
});

const del = (id) => {
  axios.delete(`http://127.0.0.1:8081/delete/${id}`)
    .then(() => {
      location.reload();
    })
    .catch(error => console.error("删除学生数据出错:", error));
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.student-info {
  width: 100%;
}

/* 页面头部 */
.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.page-header h4 {
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin-bottom: 20px;
}

/* 主按钮 */
.btn-primary {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
}

/* 表格容器 */
.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 学生表格 */
.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 12px 15px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.student-table td {
  text-align: center;
  padding: 12px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

/* 表格行 */
.table-row {
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-edit {
  background-color: #27ae60;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  transition: all 0.3s ease;
}

.btn-edit:hover {
  background-color: #219a52;
  transform: translateY(-1px);
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-delete:hover {
  background-color: #c0392b;
  transform: translateY(-1px);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h3 {
    font-size: 20px;
  }
  
  .page-header h4 {
    font-size: 16px;
  }
  
  .student-table th,
  .student-table td {
    padding: 10px 8px;
    font-size: 13px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 5px;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
