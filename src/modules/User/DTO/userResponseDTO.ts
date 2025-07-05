import { User } from "../../../entities/user";

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  role: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}
