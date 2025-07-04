import { UserRole } from "../../../types/userRole";

export class CreateUserDto {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  role: UserRole = UserRole.USER;
}
