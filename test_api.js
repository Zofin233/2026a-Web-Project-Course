// ============================================
// 学生成绩管理系统API测试脚本
// ============================================

const axios = require('axios');

// 后端API基础URL
const API_BASE_URL = 'http://127.0.0.1:8081';

// 测试数据
const testData = {
    validStudent: {
        id: 10009,
        name: '测试学生',
        gender: '男',
        chinese: 85,
        math: 90,
        english: 95
    },
    invalidStudent: {
        id: 123, // 无效学号（不是5位数字）
        name: '无效学生',
        gender: '男',
        chinese: 150, // 无效成绩（超出范围）
        math: -10, // 无效成绩（负数）
        english: 95
    },
    updateData: {
        id: 10009,
        name: '测试学生（已修改）',
        gender: '女',
        chinese: 90,
        math: 95,
        english: 100
    }
};

// 错误处理函数
function handleError(error) {
    if (error.response) {
        // 服务器返回错误状态码
        console.error('错误状态码:', error.response.status);
        console.error('错误信息:', error.response.data);
    } else if (error.request) {
        // 请求已发送但没有收到响应
        console.error('未收到响应:', error.request);
    } else {
        // 发送请求时发生错误
        console.error('请求错误:', error.message);
    }
}

// 测试添加学生
async function testAddStudent() {
    console.log('\n=== 测试添加学生 ===');
    
    try {
        // 测试添加有效学生
        console.log('测试添加有效学生...');
        const response = await axios.post(`${API_BASE_URL}/insert`, testData.validStudent);
        console.log('添加成功:', response.data);
        
        // 测试添加无效学生（学号无效）
        console.log('\n测试添加无效学生（学号无效）...');
        const invalidResponse = await axios.post(`${API_BASE_URL}/insert`, testData.invalidStudent);
        console.log('添加成功:', invalidResponse.data);
    } catch (error) {
        handleError(error);
    }
}

// 测试获取所有学生
async function testGetStudents() {
    console.log('\n=== 测试获取所有学生 ===');
    
    try {
        const response = await axios.get(`${API_BASE_URL}/list_user`);
        console.log('学生列表:', response.data);
        // 检查是否按平均分降序排列
        console.log('\n检查是否按平均分降序排列:');
        const averages = response.data.map(student => student.average);
        const isSorted = averages.every((value, index) => {
            if (index === 0) return true;
            return value <= averages[index - 1];
        });
        console.log('是否按平均分降序排列:', isSorted);
    } catch (error) {
        handleError(error);
    }
}

// 测试修改学生
async function testUpdateStudent() {
    console.log('\n=== 测试修改学生 ===');
    
    try {
        // 测试修改学生
        console.log('测试修改学生...');
        const response = await axios.post(`${API_BASE_URL}/edit`, testData.updateData);
        console.log('修改成功:', response.data);
    } catch (error) {
        handleError(error);
    }
}

// 测试删除学生
async function testDeleteStudent() {
    console.log('\n=== 测试删除学生 ===');
    
    try {
        // 测试删除学生
        console.log('测试删除学生...');
        const response = await axios.delete(`${API_BASE_URL}/delete/${testData.validStudent.id}`);
        console.log('删除成功:', response.data);
    } catch (error) {
        handleError(error);
    }
}

// 运行所有测试
async function runAllTests() {
    console.log('开始运行API测试...');
    
    await testAddStudent();
    await testGetStudents();
    await testUpdateStudent();
    await testGetStudents(); // 再次获取学生列表，查看修改结果
    await testDeleteStudent();
    await testGetStudents(); // 再次获取学生列表，查看删除结果
    
    console.log('\n所有测试完成！');
}

// 检查后端服务器是否运行
async function checkServerStatus() {
    console.log('检查后端服务器状态...');
    
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        console.log('后端服务器运行正常:', response.status);
        return true;
    } catch (error) {
        console.error('后端服务器未运行，请先启动后端服务器');
        return false;
    }
}

// 主函数
async function main() {
    const isServerRunning = await checkServerStatus();
    
    if (isServerRunning) {
        await runAllTests();
    } else {
        console.log('请先启动后端服务器，然后再运行测试');
    }
}

// 运行测试
main();
