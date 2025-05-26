import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEnum(['user', 'admin'], { message: 'Role must be either user or admin' })
  role: 'user' | 'admin';
}
