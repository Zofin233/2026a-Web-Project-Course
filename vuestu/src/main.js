import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

if (window.localStorage) {
    var oStu = {
        id: '10001',
        name: 'king',
        gender: 'male',
        chinese: '100',
        math: '100',
        english: '100'
    }
    var key = "stu" + oStu.id;
    var stu = JSON.stringify(oStu);
    localStorage.setItem(key, stu);
} else {
    alert("This browser cannot support localStorage!");
}