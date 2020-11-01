export class UserDto {
  id: number;
  username: string;
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
