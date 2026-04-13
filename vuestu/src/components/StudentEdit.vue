<template>
  <div class="divCen">
    <h3>{{ msg }}</h3>
    <h4>Student Scores Edit</h4>
    <p class="p-right">
      <router-link to="/info" active-class="active">Back to home</router-link>
    </p>
    <table>
      <tbody>
        <tr>
          <th>Id</th>
          <td>
            <input type="text" :value="id" readonly />
          </td>
        </tr>
        <tr>
          <th>Name</th>
          <td><input type="text" v-model="name" /></td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>
            <select v-model="gender">
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Chinese</th>
          <td>
            <input type="text" v-model="chinese" />
            <span v-if="chineseError" class="error">{{ chineseError }}</span>
          </td>
        </tr>
        <tr>
          <th>Math</th>
          <td>
            <input type="text" v-model="math" />
            <span v-if="mathError" class="error">{{ mathError }}</span>
          </td>
        </tr>
        <tr>
          <th>English</th>
          <td>
            <input type="text" v-model="english" />
            <span v-if="englishError" class="error">{{ englishError }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="btn_edit_stuinfo">Edit to Save</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "StudentEdit",
  data() {
    return {
      msg: "Welcome to Student Management App",
      id: "",
      name: "",
      gender: "",
      chinese: "",
      math: "",
      english: "",
      chineseError: "",
      mathError: "",
      englishError: "",
    };
  },
  created: function () {
    this.id = this.$route.params.id;
    let stuinfo = JSON.parse(localStorage.getItem("stu" + this.id));
    this.name = stuinfo.name;
    this.gender = stuinfo.gender;
    this.chinese = stuinfo.chinese;
    this.math = stuinfo.math;
    this.english = stuinfo.english;
  },
  methods: {
    validateForm() {
      let isValid = true;
      
      // 验证语文成绩
      if (isNaN(this.chinese) || this.chinese < 0 || this.chinese > 100) {
        this.chineseError = "成绩必须在0-100之间";
        isValid = false;
      } else {
        this.chineseError = "";
      }
      
      // 验证数学成绩
      if (isNaN(this.math) || this.math < 0 || this.math > 100) {
        this.mathError = "成绩必须在0-100之间";
        isValid = false;
      } else {
        this.mathError = "";
      }
      
      // 验证英语成绩
      if (isNaN(this.english) || this.english < 0 || this.english > 100) {
        this.englishError = "成绩必须在0-100之间";
        isValid = false;
      } else {
        this.englishError = "";
      }
      
      return isValid;
    },
    btn_edit_stuinfo: function () {
      if (!this.validateForm()) {
        return;
      }
      
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
  font-size: 0.8em;
  margin-left: 10px;
}
h3,
h4 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 128px;
}
p {
  font-style: normal;
}
p.p-right {
  font-style: italic;
  text-align: right;
}
div.divCen {
  margin: 2px auto;
  width: auto;
}
table {
  width: 60%;
  margin: auto;
  border-collapse: collapse;
  border: 0;
  text-align: center;
}
th {
  background-color: #93daff;
  color: #000000;
}
th,
td {
  font-size: 0.95em;
  text-align: center;
  padding: 4px;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #c1e9fe;
  border-width: 1px 0 1px 0;
}
tr {
  border: 1px solid #c1e9fe;
}
tr:nth-child(odd) {
  background-color: #dbf2fe;
}
tr:nth-child(even) {
  background-color: #fdfdfd;
}
</style>
