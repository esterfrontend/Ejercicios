-- 1
SELECT * FROM `pokemon`;
-- 2
SELECT `Name`, `Type 1`, `Type 2` FROM `pokemon`;
-- 3
SELECT * FROM pokemon WHERE `Type 1` LIKE 'Fire' OR `Type 2` LIKE 'Fire'
-- 4
SELECT * FROM pokemon WHERE Speed > 90
-- 5
SELECT * FROM pokemon ORDER BY Total DESC
-- 6
SELECT * FROM pokemon Legendary = True
-- 7
SELECT * FROM pokemon WHERE Legendary = 'True';
-- 8
SELECT Name, `Type 1`, `Type 2`  FROM pokemon WHERE Generation = 2;
-- 9
SELECT * FROM pokemon WHERE Defense > 70 AND `Type 1` LIKE 'Grass' OR `Type 2` LIKE 'Grass'
-- 10
SELECT COUNT(*) AS `Cantidad Pokemon` FROM pokemon
-- 11
SELECT AVG(Total) AS `Average Total` FROM pokemon
-- 12
SELECT * FROM pokemon WHERE Total > 400 AND `Type 1` LIKE 'Water' OR `Type 2` LIKE 'Water'
-- 13
SELECT * FROM pokemon WHERE Name LIKE 'C%'
-- 14
SELECT * FROM pokemon WHERE Generation = 3 AND Legendary = 'False';
-- 15
SELECT * FROM pokemon WHERE Name LIKE '%Mega%'
