const express = require('express');
const router = express.Router();
const Student = require('./../models/Student');

// 获取所有学生
router.get('/list_user', async (req, res) => {
    try {
        const students = await Student.getAll();
        res.status(200).json(students);
    } catch (error) {
        console.error('获取学生列表失败:', error);
        res.status(500).json({ success: false, message: '获取学生列表失败' });
    }
});

// 添加学生
router.post('/insert', async (req, res) => {
    try {
        const result = await Student.add(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('添加学生失败:', error);
        res.status(500).json({ success: false, message: '添加学生失败' });
    }
});

// 修改学生
router.post('/edit', async (req, res) => {
    try {
        const result = await Student.update(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('修改学生失败:', error);
        res.status(500).json({ success: false, message: '修改学生失败' });
    }
});

// 删除学生
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Student.delete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('删除学生失败:', error);
        res.status(500).json({ success: false, message: '删除学生失败' });
    }
});

// 获取单个学生
router.get('/get_user', async (req, res) => {
    try {
        const student = await Student.getById(req.query.id);
        res.status(200).json(student);
    } catch (error) {
        console.error('获取学生失败:', error);
        res.status(500).json({ success: false, message: '获取学生失败' });
    }
});

module.exports = router;