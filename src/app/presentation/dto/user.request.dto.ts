import { ApiProperty } from '@nestjs/swagger';

export class UserIdRequest {
  @ApiProperty({ description: '유저Id' })
  userId: string;
}

export class UserInfoRequest {
  @ApiProperty({ description: '유저Id' })
  userId: string;
  @ApiProperty({ description: '유저PW' })
  userPw: string;
  @ApiProperty({ description: '유저이름' })
  userName: string;
  @ApiProperty({ description: '유저Email' })
  userEmail: string;
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
