import { Test, TestingModule } from '@nestjs/testing';
import { ConcertUseCase } from './concert.use-case';
import { ConcertService } from '../domain/services/concert.service';

describe('ConcertService', () => {
  let usecase: ConcertUseCase;
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertService],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
