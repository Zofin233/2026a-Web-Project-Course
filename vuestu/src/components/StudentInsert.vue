<template>
  <div class="student-insert">
    <div class="page-header">
      <h3>Welcome to Student Management App</h3>
      <h4>添加学生成绩</h4>
      <router-link to="/info" class="btn-back">返回列表</router-link>
    </div>
    <div class="form-container">
      <form @submit.prevent="submitForm" class="student-form">
        <div class="form-group">
          <label for="id">学号</label>
          <input type="text" id="id" v-model="id" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="name" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="gender">性别</label>
          <input type="text" id="gender" v-model="gender" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="chinese">语文</label>
          <input type="number" id="chinese" v-model="chinese" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="math">数学</label>
          <input type="number" id="math" v-model="math" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="english">英语</label>
          <input type="number" id="english" v-model="english" class="form-input" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">添加学生</button>
        </div>
      </form>
    </div>
  </div>
</template>
<!-- 
<script>
export default {
  name: "StudentInsert",
  data() {
    return {
      msg: "Welcome to Student Management App",
      id: "",
      name: "",
      gender: "",
      chinese: "",
      math: "",
      english: "",
    };
  },
  created: function () {
    let len = localStorage.length;
    let stuinfo;
    let id_max = 10001;
    for (let i = 0; i < len; i++) {
      let stukey = localStorage.key(i);
      if (stukey.substring(0, 3) == "stu") {
        stuinfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (id_max < stuinfo.id) {
          id_max = stuinfo.id;
        }
      }
    }
    this.id = parseInt(id_max) + 1;
  },
  methods: {
    btn_add_stuinfo: function () {
      let oStu = {
        id: this.id,
        name: this.name,
        gender: this.gender,
        chinese: this.chinese,
        math: this.math,
        english: this.english,
      };
      var key = "stu" + oStu.id;
      var stu = JSON.stringify(oStu);
      localStorage.setItem(key, stu);
      this.$router.push({ path: "/info" });
    },
  },
};
</script> -->


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();
const id = ref('');
const name = ref('');
const gender = ref('');
const chinese = ref(0);
const math = ref(0);
const english = ref(0);

const submitForm = () => {
     const studentInfo = {
      id: id.value,
      name: name.value,
      gender: gender.value,
      chinese: chinese.value,
      math: math.value,
      english: english.value
    };

    axios.post("http://127.0.0.1:8081/insert", studentInfo)
      .then(response => {
        console.log("学生信息保存成功！", response.data);
        alert('学生信息添加成功！');
        router.push('/info');
      })
      .catch(error => {
        console.error("保存学生信息时出错：", error);
        alert('添加失败，请重试');
      });
  };

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.student-insert {
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

/* 返回按钮 */
.btn-back {
  display: inline-block;
  background-color: #95a5a6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background-color: #7f8c8d;
  transform: translateY(-1px);
  color: white;
}

/* 表单容器 */
.form-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
}

/* 学生表单 */
.student-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 表单组 */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 表单输入框 */
.form-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
}

/* 表单操作 */
.form-actions {
  margin-top: 10px;
  text-align: center;
}

/* 提交按钮 */
.btn-submit {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h3 {
    font-size: 20px;
  }
  
  .page-header h4 {
    font-size: 16px;
  }
  
  .form-container {
    padding: 20px;
    margin: 0 10px;
  }
  
  .form-input {
    padding: 8px 10px;
  }
  
  .btn-submit {
    padding: 10px 20px;
  }
}
</style>
