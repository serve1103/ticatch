import { ApiProperty } from '@nestjs/swagger';

export class UserIdRequest {
  @ApiProperty({ description: '유저Id' })
  userId: string;
}

export class UserInfoRequestDto {
  @ApiProperty({ description: '유저Id' })
  userId: string;
  @ApiProperty({ description: '유저이름' })
  userName: string;
  @ApiProperty({ description: '유저Email' })
  userEmail?: string;
  @ApiProperty({ description: '유저생성일시' })
  createdAt: Date;

  constructor(
    userId: string,
    userName: string,
    createdAt: Date,
    userEmail?: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.createdAt = createdAt;
  }
}

export class UpdateUserRequest {
  @ApiProperty({ description: '유저Id' })
  userId: string;
  @ApiProperty({ description: '유저이름' })
  userName: string;
  @ApiProperty({ description: '유저Email' })
  userEmail: string;
}

export class GetUserPointDto {
  @ApiProperty({ description: '유저Id' })
  userId: string;

  toDmain() {
    return {
      userId: this.userId,
    };
  }
}
