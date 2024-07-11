export class UserIdRequest {
  userId: string;
}

export class UserInfoRequest {
  userId: string;
  userPw: string;
  userName: string;
  userEmail: string;
}

export class UpdateUserRequest {
  userId: string;
  userName: string;
  userEmail: string;
}
