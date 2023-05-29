import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

export const UserFromToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[AuthGuard.requestFieldUser];
  },
);
