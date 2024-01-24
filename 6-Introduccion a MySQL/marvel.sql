-- 1
SELECT * FROM `marvel` WHERE ALIGN LIKE 'Good Characters';
-- 2
SELECT * FROM `marvel` WHERE EYE LIKE 'Brown Eyes' AND HAIR LIKE 'Brown Hair';
-- 3
SELECT * FROM `marvel` WHERE SEX LIKE 'Male Characters' AND ALIVE LIKE 'Living Characters';
-- 4
SELECT * FROM `marvel` WHERE ID LIKE 'Public Identity' AND APPEARANCES > 100;
-- 5
SELECT * FROM `marvel` WHERE Year >= 1960 AND Year < 1970;
-- 6
SELECT * FROM `marvel` WHERE ALIGN LIKE 'Neutral Characters';
-- 7
SELECT * FROM `marvel` WHERE GSM LIKE '';
-- 8
SELECT * FROM `marvel` WHERE ALIVE LIKE 'Living Characters' AND APPEARANCES <= 220;
-- 9
SELECT * FROM `marvel` WHERE EYE != 'Blue Eyes' AND EYE != 'Brown Eyes';
-- 10
SELECT * FROM `marvel` WHERE APPEARANCES > 50 AND APPEARANCES < 250;
-- 11
SELECT * FROM `marvel` WHERE SEX LIKE 'Female Characters' AND ALIVE LIKE 'Deceased Characters';
-- 12
SELECT * FROM `marvel` WHERE Year >= 2000;
