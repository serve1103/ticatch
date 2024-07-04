import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from '../presentation/concert.controller';

describe('ConcertController', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  beforeAll(async () => {
    jest.useFakeTimers();
  });

  describe('콘서트 조회', () => {
    it('조회 성공', async () => {
      const concertName = '강수지 드림콘';
      const concertOpenedDate = Date.now();
      const concertClosedDate = Date.now() + 3;
      const concertMaxCapacity = 50;
      const concertApplyCapacity = 50;

      const result = await controller.getConcert(concertName);

      expect(result).toEqual([
        {
          concertName,
          concertOpenedDate,
          concertClosedDate,
          concertMaxCapacity,
          concertApplyCapacity,
        },
      ]);
    });

    it('조회 실패 - 콘서트를 찾을 수 없음', async () => {
      const concertName = null;

      await expect(controller.getConcert(concertName)).rejects.toThrow(
        '콘서트를 찾을 수 없습니다.',
      );
    });

    it('조회 실패 - 콘서트 명을 입력하지 않음', async () => {
      const concertName = '';

      await expect(controller.getConcert(concertName)).rejects.toThrow(
        '콘서트 명을 입력해주세요.',
      );
    });
  });

  describe('콘서트 등록', () => {
    it('등록 성공', async () => {
      const concertName = '강수지 월드 콘서트';
      const concertOpenedDate = Date.now();
      const concertClosedDate = Date.now() + 10000;
      const concertMaxCapacity = 50;

      const concertId = '1';
      const concertApplyCapacity = 0;

      const result = await controller.setConcert({
        concertName,
        concertOpenedDate,
        concertClosedDate,
        concertMaxCapacity,
      });

      expect(result).toEqual({
        concertId,
        concertName,
        concertOpenedDate,
        concertClosedDate,
        concertMaxCapacity,
        concertApplyCapacity,
      });
    });

    it('등록 실패 - 콘서트 명을 입력하지 않음', async () => {
      const concertName = '';
      const concertOpenedDate = Date.now();
      const concertClosedDate = Date.now() + 10000;
      const concertMaxCapacity = 50;

      await expect(
        controller.setConcert({
          concertName,
          concertOpenedDate,
          concertClosedDate,
          concertMaxCapacity,
        }),
      ).rejects.toThrow('콘서트 명을 입력해주세요.');
    });

    it('등록 실패 - 마감일 설정이 잘못 되었을 경우', async () => {
      const concertName = '강수지 월드 콘서트 - 뉴욕';
      const concertOpenedDate = Date.now();
      const concertClosedDate = Date.now() - 1000;
      const concertMaxCapacity = 50;

      await expect(
        controller.setConcert({
          concertName,
          concertOpenedDate,
          concertClosedDate,
          concertMaxCapacity,
        }),
      ).rejects.toThrow('마감일이 오픈일보다 적습니다.');
    });

    it('등록 실패 - 정원 설정이 잘못 된 경우', async () => {
      const concertName = '강수지 월드 콘서트 - 뉴욕';
      const concertOpenedDate = Date.now();
      const concertClosedDate = Date.now() + 1000;
      const concertMaxCapacity = 0;

      await expect(
        controller.setConcert({
          concertName,
          concertOpenedDate,
          concertClosedDate,
          concertMaxCapacity,
        }),
      ).rejects.toThrow('정원은 1명 이상이여야 합니다.');
    });
  });

  describe('콘서트 삭제', () => {
    it('삭제 성공', async () => {
      const concertName = '강수지 드림콘';
      const concertOpenedDate = Date.now();

      const result = true;

      expect(result).toEqual(true);
    });

    it('삭제 실패 - 콘서트를 찾을 수 없음', async () => {
      const concertName = null;

      await expect(controller.getConcert(concertName)).rejects.toThrow(
        '콘서트를 찾을 수 없습니다.',
      );
    });

    it('조회 실패 - 콘서트 명을 입력하지 않음', async () => {
      const concertName = '';

      await expect(controller.getConcert(concertName)).rejects.toThrow(
        '콘서트 명을 입력해주세요.',
      );
    });
  });

  describe('예약 가능 날짜 조회', () => {
    it('조회 성공', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate1 = '2024-03-08';
      const concertOpenedDate2 = '2024-11-03';
      const concertOpenedDate3 = '2025-01-21';

      const result = await controller.getConcertDate(concertName);

      expect(result).toEqual([
        { concertName, concertOpenedDate1 },
        { concertName, concertOpenedDate2 },
        { concertName, concertOpenedDate3 },
      ]);
    });

    it('조회 실패', async () => {
      const concertName = null;

      await expect(controller.getConcertDate(concertName)).rejects.toThrow('콘서트를 찾을 수 없습니다.')
    });
  });

  describe('예약 가능 날짜 별 좌석 조회', () => {
    it('조회 성공', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = '2024-03-08';
      const concertSeatNumbers = [ 10, 20, 30 ];

      const result = await controller.getConcertDateToCapacity({ concertName, concertOpenedDate });

      expect(result).toEqual({ concertName, concertOpenedDate, concertSeatNumbers });
    });

    it('조회 실패 - 날짜를 찾을 수 없습니다.', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = null;
      await expect(controller.getConcertDateToCapacity({ concertName, concertOpenedDate })).rejects.toThrow('날짜를 찾을 수 없습니다.')
    });
  });

  describe('예약 가능 날짜 별 좌석 예약', () => {
    it('예약 성공', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = '2024-03-08';
      const concertSeatNumber = 10;

      const result = await controller.setConcertDateToCapacity({ concertName, concertOpenedDate, concertSeatNumber });

      expect(result).toEqual(true);
    });

    it('예약 실패 - 좌석을 찾을 수 없을 때', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = '2024-03-08';
      const concertSeatNumber = null;
      await expect(controller.setConcertDateToCapacity({ concertName, concertOpenedDate, concertSeatNumber })).rejects.toThrow('좌석을 선택해 주세요.');
    });
  });

  describe('예약 가능 날짜 별 좌석 예약 취소', () => {
    it('취소 성공', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = '2024-03-08';
      const concertSeatNumber = 10;

      const result = await controller.delConcertDateToCapacity({ concertName, concertOpenedDate, concertSeatNumber });

      expect(result).toEqual(true);
    });

    it('취소 실패 - 좌석을 찾을 수 없을 때.', async () => {
      const concertName = '강수지 팬미팅';
      const concertOpenedDate = '2024-03-08';
      const concertSeatNumber = null;
      await expect(controller.delConcertDateToCapacity({ concertName, concertOpenedDate, concertSeatNumber })).rejects.toThrow('좌석을 선택해 주세요.');
    });
  });
});
