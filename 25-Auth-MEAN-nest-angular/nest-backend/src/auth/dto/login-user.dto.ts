import { IsEmail, MinLength } from 'class-validator';
export class LoginUser {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'El campo password debe tener al menos $constraint1 caracteres.',
  })
  password: string;
}
