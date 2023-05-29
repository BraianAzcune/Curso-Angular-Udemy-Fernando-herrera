import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
    message:
      'El campo name debe comenzar con una letra y solo puede contener letras y números',
  })
  name: string;
  @MinLength(6, {
    message: 'El campo password debe tener al menos $constraint1 caracteres.',
  })
  password: string;
}
