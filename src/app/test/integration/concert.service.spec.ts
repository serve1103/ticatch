import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from '@app/domain/services/concert.service';

describe('ConcertService', () => {
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
