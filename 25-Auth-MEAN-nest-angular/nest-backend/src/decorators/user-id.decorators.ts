import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

export const UserFromToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request[AuthGuard.requestFieldUser] == undefined) {
      console.error(
        'no existe el usuario y se quiere usar el decorador "UserFromToken", asegurese de que esta el guard de autenticacion al menos',
      );
      throw new InternalServerErrorException();
    }
    return request[AuthGuard.requestFieldUser];
  },
);
