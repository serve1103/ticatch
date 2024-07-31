import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

import { UserWaitQueueUseCase } from '@app/application/userWaitQueue.use-case';
import { CreateUserWaitQueueDto } from '@app/presentation/dto/userWaitQueue.request.dto';
import { UserWaitQueueResponseDto } from '@app/presentation/dto/userWaitQueue.response.dto';
import { PresentationMapper } from '@app/presentation/mappers/userWaitQueue.mapper';

@ApiTags('User Wait Queue')
@Controller('userWaitQueue')
export class UserWaitQueueController {
  constructor(private readonly userWaitQueueUseCase: UserWaitQueueUseCase) {}

  @ApiOperation({ summary: '유저 대기열 추가' })
  @ApiResponse({
    status: 201,
    description: '유저 대기열에 성공적으로 추가되었습니다.',
    type: UserWaitQueueResponseDto,
  })
  @Post()
  async addToQueue(
    @Body() createUserWaitQueueDto: CreateUserWaitQueueDto,
  ): Promise<UserWaitQueueResponseDto> {
    const savedQueue = await this.userWaitQueueUseCase.addToQueue(
      createUserWaitQueueDto.userId,
    );
    return PresentationMapper.toResponse(savedQueue);
  }

  @ApiOperation({ summary: '유저 대기열 상태 조회' })
  @ApiParam({
    name: 'userId',
    description: '조회할 유저 ID',
  })
  @ApiResponse({
    status: 200,
    description: '유저 대기열 상태 조회에 성공했습니다.',
    type: UserWaitQueueResponseDto,
  })
  @Get(':userId')
  async getQueueStatus(
    @Param('userId') userId: string,
  ): Promise<UserWaitQueueResponseDto> {
    const queue = await this.userWaitQueueUseCase.getQueueStatus(userId);
    return PresentationMapper.toResponse(queue);
  }

  @ApiOperation({ summary: '전체 유저 대기열 조회' })
  @ApiResponse({
    status: 200,
    description: '전체 유저 대기열 조회에 성공했습니다.',
    type: [UserWaitQueueResponseDto],
  })
  @Get()
  async getAllQueues(): Promise<UserWaitQueueResponseDto[]> {
    const queues = await this.userWaitQueueUseCase.getAllQueueStatus();
    return queues.map((item) => PresentationMapper.toResponse(item));
  }
}
