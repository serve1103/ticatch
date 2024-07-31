import { Test, TestingModule } from '@nestjs/testing';
import { UserWaitQueueUseCase } from '../../application/userWaitQueue.use-case';
import { QueueState } from '../../domain/models/userWaitQueue.model';
import { UserInfoService } from '../../domain/services/userInfo.service';
import { UserWaitQueueService } from '../../domain/services/userWaitQueue.service';
import { RedisModule } from '../../infrastructure/redis.module';
import { RedisService } from '../../infrastructure/redis.service';

describe('UserWaitQueueUseCase (Integration)', () => {
  let useCase: UserWaitQueueUseCase;
  let redisService: RedisService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [
        UserWaitQueueUseCase,
        UserWaitQueueService,
        {
          provide: UserInfoService,
          useValue: {
            findByUserId: jest
              .fn()
              .mockResolvedValue({ userId: 'test-user-id' }),
          },
        },
      ],
    }).compile();

    useCase = module.get<UserWaitQueueUseCase>(UserWaitQueueUseCase);
    redisService = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await redisService.getClient().flushall(); // Clean up Redis database
    await module.close();
  });

  it('should add a user to the queue and retrieve the queue status', async () => {
    const userId = 'test-user-id';

    // Add user to the queue
    const userQueue = await useCase.addToQueue(userId);
    expect(userQueue.userId).toBe(userId);
    expect(userQueue.state).toBe(QueueState.WAITING);

    // Retrieve the queue status
    const queueStatus = await useCase.getQueueStatus(userId);
    expect(queueStatus).toBeDefined();
    expect(queueStatus.userId).toBe(userId);
  });

  it('should retrieve the status of all users in the queue', async () => {
    const userQueueList = await useCase.getAllQueueStatus();
    expect(userQueueList.length).toBeGreaterThan(0);
  });

  it('should activate users in the queue', async () => {
    await useCase.activateUsers();

    // Check active users in Redis
    const activeUsers = await redisService.getActiveUsers();
    expect(activeUsers.length).toBeGreaterThan(0);
    expect(activeUsers[0].state).toBe(QueueState.USING);
  });
});
