-- exec ConcertUniqueDummyData
ALTER PROCEDURE ConcertUniqueDummyData
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @maxConcerts INT = 100000; -- 총 삽입할 콘서트 수
    DECLARE @optionsPerConcert INT = 5; -- 각 콘서트당 생성할 옵션 수
    DECLARE @maxCapacity INT = 50; -- 각 옵션당 최대 방 수

    -- Concert 데이터 삽입
    ;WITH Numbers AS (
        SELECT TOP (@maxConcerts) 
            ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS num
        FROM master.sys.all_columns a
        CROSS JOIN master.sys.all_columns b
    )
    INSERT INTO Concert (concertName)
    SELECT 
        'concert' + CAST(num AS VARCHAR(10))
    FROM Numbers;

    -- ConcertOptions 데이터 삽입
    ;WITH ConcertNumbers AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS row_num
        FROM Concert
    ),
    OptionNumbers AS (
        SELECT 
            c.id AS concertIdx, 
            DATEADD(DAY, o.num, GETDATE()) AS concertOpenedDate,
            DATEADD(DAY, o.num + 1, GETDATE()) AS concertClosedDate,
            @maxCapacity AS concertMaxCapacity,
            0 AS concertApplyCapacity
        FROM ConcertNumbers c
        CROSS JOIN (VALUES (1), (2), (3), (4), (5)) AS o(num)
    )
    INSERT INTO ConcertOptions (concertIdx, concertOpenedDate, concertClosedDate, concertMaxCapacity, concertApplyCapacity)
    SELECT concertIdx, concertOpenedDate, concertClosedDate, concertMaxCapacity, concertApplyCapacity
    FROM OptionNumbers;

    -- ConcertOptionsRoom 데이터 삽입
    ;WITH OptionRooms AS (
        SELECT 
            o.idx AS concertOptionsId,
            ROW_NUMBER() OVER (PARTITION BY o.idx ORDER BY o.idx) AS roomNumber,
            50 + (ROW_NUMBER() OVER (PARTITION BY o.idx ORDER BY o.idx)) * 5 AS roomPrice
        FROM ConcertOptions o
        CROSS APPLY (SELECT TOP (@maxCapacity) * FROM master.sys.all_columns) AS Numbers
    )
    INSERT INTO ConcertOptionsRoom (concertOptionsId, concertRoomNumber, concertRoomPrice, version)
    SELECT concertOptionsId, roomNumber, roomPrice, 1
    FROM OptionRooms;
END;
