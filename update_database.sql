-- 修改数据库结构

-- 1. 修改性别字段类型为bit
ALTER TABLE stuScore MODIFY COLUMN gender BIT(1);

-- 2. 添加总分和平均分字段
ALTER TABLE stuScore ADD COLUMN total INT;
ALTER TABLE stuScore ADD COLUMN average DECIMAL(5,2);

-- 3. 更新现有数据的总分和平均分
UPDATE stuScore SET 
    total = chinese + math + english,
    average = (chinese + math + english) / 3;

-- 4. 查看修改后的表结构
DESCRIBE stuScore;

-- 5. 查看修改后的数据
SELECT * FROM stuScore;
