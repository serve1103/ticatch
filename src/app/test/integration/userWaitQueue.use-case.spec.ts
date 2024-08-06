import { Test, TestingModule } from '@nestjs/testing';
import { UserWaitQueueUseCase } from '../../application/userWaitQueue.use-case';
import { QueueState } from '../../domain/models/userWaitQueue.model';
import { UserInfoService } from '../../domain/services/userInfo.service';
import { UserWaitQueueService } from '../../domain/services/userWaitQueue.service';
import { RedisModule } from '../../infrastructure/redis.module';
import { RedisService } from '../../infrastructure/redis.client';

describe('UserWaitQueueUseCase (Integration)', () => {
  let useCase: UserWaitQueueUseCase;
  let redisService: RedisService;
  let module: TestingModule;

  beforeAll(async () => {
    // 테스트 모듈 생성
    module = await Test.createTestingModule({
      imports: [RedisModule], // RedisModule을 imports에 추가
      providers: [
        UserWaitQueueUseCase,
        UserWaitQueueService,
        RedisService, // RedisService를 명시적으로 추가합니다.
        {
          provide: UserInfoService,
          useValue: {
            findByUserId: jest
              .fn()
              .mockResolvedValue({ userId: 'test-user-id' }), // UserInfoService의 mock 설정
          },
        },
      ],
    }).compile();

    // 의존성 주입
    useCase = module.get<UserWaitQueueUseCase>(UserWaitQueueUseCase);
    redisService = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await redisService.getClient().flushall(); // Redis 데이터베이스 정리
    await redisService.getClient().quit(); // Redis 클라이언트 종료
    await module.close(); // 모듈 닫기
  });

  it('should add a user to the queue and retrieve the queue status', async () => {
    const userId = 'test-user-id';

    // 큐에 사용자 추가
    const userQueue = await useCase.addToQueue(userId);
    expect(userQueue.userId).toBe(userId);
    expect(userQueue.state).toBe(QueueState.WAITING);

    // 큐 상태 조회
    const queueStatus = await useCase.getQueueStatus(userId);
    expect(queueStatus).toBeDefined();
    expect(queueStatus.userId).toBe(userId);
  });

  it('should retrieve the status of all users in the queue', async () => {
    // 모든 사용자 큐 상태 조회
    const userQueueList = await useCase.getAllQueueStatus();
    expect(userQueueList.length).toBeGreaterThan(0);
  });

  it('should activate users in the queue', async () => {
    // 사용자 활성화
    await useCase.activateUsers();

    // Redis에서 활성 사용자 확인
    const activeUsers = await redisService.getActiveUsers();
    expect(activeUsers.length).toBeGreaterThan(0);
    expect(activeUsers[0].state).toBe(QueueState.USING);
  });

  it('should not add the same user to the queue more than once', async () => {
    const userId = 'test-user-id';

    // 동일 사용자 큐에 첫 번째 추가
    await useCase.addToQueue(userId);

    // 동일 사용자 큐에 두 번째 추가 (무시됨)
    await useCase.addToQueue(userId);

    // 큐 상태 조회
    const queueStatusList = await useCase.getAllQueueStatus();
    const userQueues = queueStatusList.filter(
      (queue) => queue.userId === userId,
    );

    // 동일 아이디의 사용자가 큐에 한 번만 존재해야 함
    expect(userQueues.length).toBe(1);
  });
});
