import { Test, TestingModule } from '@nestjs/testing';
import { ConcertUseCase } from '../../application/concert.use-case';
import { ConcertService } from '../../domain/services/concert.service';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
  ConcertRoomState,
} from '../../domain/models/concert.model';

describe('ConcertUseCase (Integration)', () => {
  let useCase: ConcertUseCase;
  let service: ConcertService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ConcertUseCase,
        {
          provide: ConcertService,
          useValue: {
            getConcertAll: jest.fn(),
            getConcertById: jest.fn(),
            getAvailableSeats: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ConcertUseCase>(ConcertUseCase);
    service = module.get<ConcertService>(ConcertService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('getConcertAll', () => {
    it('should return all concerts', async () => {
      const concertModels: ConcertModel[] = [
        new ConcertModel(1, 'Concert 1', []),
      ];
      jest.spyOn(service, 'getConcertAll').mockResolvedValue(concertModels);

      const result = await useCase.getConcertAll();
      expect(result).toEqual(concertModels);
      expect(service.getConcertAll).toHaveBeenCalled();
    });
  });

  describe('getConcertById', () => {
    it('should return a concert by ID', async () => {
      const concertId = 1;
      const concertModels: ConcertModel[] = [
        new ConcertModel(concertId, 'Concert 1', []),
      ];
      jest.spyOn(service, 'getConcertAll').mockResolvedValue(concertModels);

      const result = await useCase.getConcertById(concertId);
      expect(result).toEqual(concertModels);
      expect(service.getConcertAll).toHaveBeenCalledWith(concertId);
    });
  });

  describe('getAvailableSeats', () => {
    it('should return available seats for a concert option', async () => {
      const concertOptionsId = 1;
      const availableSeats = [
        {
          concertOption: new ConcertOptionsModel(
            new Date(),
            new Date(),
            100,
            50,
          ),
          rooms: [
            new ConcertOptionsRoomModel(
              1,
              101,
              50,
              'user1',
              ConcertRoomState.AVAILABLE,
            ),
          ],
        },
      ];
      jest
        .spyOn(service, 'getAvailableSeats')
        .mockResolvedValue(availableSeats);

      const result = await useCase.getAvailableSeats(concertOptionsId);
      expect(result).toEqual(availableSeats);
      expect(service.getAvailableSeats).toHaveBeenCalledWith(concertOptionsId);
    });
  });
});
