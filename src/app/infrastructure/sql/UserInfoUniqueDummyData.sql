-- EXEC GenerateUniqueDummyData;
CREATE PROCEDURE UserInfoUniqueDummyData
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @i INT = 0;
    DECLARE @batchSize INT = 10000; -- 한번에 삽입할 데이터 수
    DECLARE @max INT = 100000; -- 총 삽입할 데이터 수

    WHILE @i <= @max
    BEGIN
        ;WITH Numbers AS (
            SELECT TOP (@batchSize) 
                ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS num
            FROM master.sys.all_columns a
            CROSS JOIN master.sys.all_columns b
        )
        INSERT INTO UserInfo (userId, userName)
        SELECT 
            'test' + CAST(num + @i AS VARCHAR(10)),
            'test' + CAST(num + @i AS VARCHAR(10))
        FROM Numbers;

        SET @i = @i + @batchSize;
    END
END;