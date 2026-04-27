-- ============================================
-- 学生成绩管理系统数据库初始化脚本
-- ============================================

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS vuestu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE vuestu;

-- ============================================
-- 创建学生成绩表
-- ============================================
DROP TABLE IF EXISTS stuScore;

CREATE TABLE stuScore (
    id INT PRIMARY KEY COMMENT '学号，5位数字',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    gender BIT(1) NOT NULL DEFAULT 0 COMMENT '性别：0-女，1-男',
    chinese INT NOT NULL DEFAULT 0 COMMENT '语文成绩，范围0-100',
    math INT NOT NULL DEFAULT 0 COMMENT '数学成绩，范围0-100',
    english INT NOT NULL DEFAULT 0 COMMENT '英语成绩，范围0-100',
    total INT DEFAULT 0 COMMENT '总分',
    average DECIMAL(5,2) DEFAULT 0.00 COMMENT '平均分'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生成绩表';

-- ============================================
-- 创建索引
-- ============================================
-- 按平均分降序排列的索引（用于提高排序查询性能）
CREATE INDEX idx_average ON stuScore(average DESC);

-- 按姓名模糊搜索的索引
CREATE INDEX idx_name ON stuScore(name);

-- ============================================
-- 插入测试数据
-- ============================================
INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average) VALUES
(10001, '张三', 1, 85, 90, 95, 270, 90.00),
(10002, '李四', 0, 78, 82, 88, 248, 82.67),
(10003, '王五', 1, 92, 88, 90, 270, 90.00),
(10004, '赵六', 0, 65, 70, 72, 207, 69.00),
(10005, '孙七', 1, 88, 92, 85, 265, 88.33),
(10006, '周八', 0, 95, 89, 94, 278, 92.67),
(10007, '吴九', 1, 70, 75, 68, 213, 71.00),
(10008, '郑十', 0, 82, 85, 80, 247, 82.33);

-- ============================================
-- 创建视图：学生成绩排名视图
-- ============================================
CREATE OR REPLACE VIEW student_ranking AS
SELECT
    ROW_NUMBER() OVER (ORDER BY average DESC) AS ranking,
    id,
    name,
    CASE WHEN gender = 1 THEN '男' ELSE '女' END AS gender,
    chinese,
    math,
    english,
    total,
    average
FROM stuScore;

-- ============================================
-- 创建存储过程：添加学生成绩
-- ============================================
DELIMITER //

DROP PROCEDURE IF EXISTS add_student//
CREATE PROCEDURE add_student(
    IN p_id INT,
    IN p_name VARCHAR(50),
    IN p_gender BIT(1),
    IN p_chinese INT,
    IN p_math INT,
    IN p_english INT
)
BEGIN
    DECLARE p_total INT;
    DECLARE p_average DECIMAL(5,2);

    -- 验证学号是否为5位数字
    IF p_id < 10000 OR p_id > 99999 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '学号必须是5位数字';
    END IF;

    -- 验证成绩范围
    IF p_chinese < 0 OR p_chinese > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '语文成绩必须在0-100之间';
    END IF;

    IF p_math < 0 OR p_math > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '数学成绩必须在0-100之间';
    END IF;

    IF p_english < 0 OR p_english > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '英语成绩必须在0-100之间';
    END IF;

    -- 计算总分和平均分
    SET p_total = p_chinese + p_math + p_english;
    SET p_average = p_total / 3;

    -- 插入数据
    INSERT INTO stuScore (id, name, gender, chinese, math, english, total, average)
    VALUES (p_id, p_name, p_gender, p_chinese, p_math, p_english, p_total, p_average);
END//

DELIMITER ;

-- ============================================
-- 创建存储过程：更新学生成绩
-- ============================================
DELIMITER //

DROP PROCEDURE IF EXISTS update_student//
CREATE PROCEDURE update_student(
    IN p_id INT,
    IN p_name VARCHAR(50),
    IN p_gender BIT(1),
    IN p_chinese INT,
    IN p_math INT,
    IN p_english INT
)
BEGIN
    DECLARE p_total INT;
    DECLARE p_average DECIMAL(5,2);

    -- 验证成绩范围
    IF p_chinese < 0 OR p_chinese > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '语文成绩必须在0-100之间';
    END IF;

    IF p_math < 0 OR p_math > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '数学成绩必须在0-100之间';
    END IF;

    IF p_english < 0 OR p_english > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '英语成绩必须在0-100之间';
    END IF;

    -- 计算总分和平均分
    SET p_total = p_chinese + p_math + p_english;
    SET p_average = p_total / 3;

    -- 更新数据
    UPDATE stuScore
    SET name = p_name,
        gender = p_gender,
        chinese = p_chinese,
        math = p_math,
        english = p_english,
        total = p_total,
        average = p_average
    WHERE id = p_id;
END//

DELIMITER ;

-- ============================================
-- 创建触发器：在插入前验证数据
-- ============================================
DELIMITER //

DROP TRIGGER IF EXISTS before_insert_student//
CREATE TRIGGER before_insert_student
BEFORE INSERT ON stuScore
FOR EACH ROW
BEGIN
    -- 验证学号是否为5位数字
    IF NEW.id < 10000 OR NEW.id > 99999 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '学号必须是5位数字';
    END IF;

    -- 验证成绩范围
    IF NEW.chinese < 0 OR NEW.chinese > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '语文成绩必须在0-100之间';
    END IF;

    IF NEW.math < 0 OR NEW.math > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '数学成绩必须在0-100之间';
    END IF;

    IF NEW.english < 0 OR NEW.english > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '英语成绩必须在0-100之间';
    END IF;

    -- 自动计算总分和平均分
    SET NEW.total = NEW.chinese + NEW.math + NEW.english;
    SET NEW.average = NEW.total / 3;
END//

DELIMITER ;

-- ============================================
-- 创建触发器：在更新前验证数据
-- ============================================
DELIMITER //

DROP TRIGGER IF EXISTS before_update_student//
CREATE TRIGGER before_update_student
BEFORE UPDATE ON stuScore
FOR EACH ROW
BEGIN
    -- 验证成绩范围
    IF NEW.chinese < 0 OR NEW.chinese > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '语文成绩必须在0-100之间';
    END IF;

    IF NEW.math < 0 OR NEW.math > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '数学成绩必须在0-100之间';
    END IF;

    IF NEW.english < 0 OR NEW.english > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '英语成绩必须在0-100之间';
    END IF;

    -- 自动计算总分和平均分
    SET NEW.total = NEW.chinese + NEW.math + NEW.english;
    SET NEW.average = NEW.total / 3;
END//

DELIMITER ;

-- ============================================
-- 查询示例：按平均分降序查看所有学生
-- ============================================
-- SELECT * FROM stuScore ORDER BY average DESC;

-- ============================================
-- 查询示例：查看学生排名
-- ============================================
-- SELECT * FROM student_ranking;
