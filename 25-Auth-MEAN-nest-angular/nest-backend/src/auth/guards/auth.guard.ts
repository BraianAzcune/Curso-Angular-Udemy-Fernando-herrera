import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public static readonly requestFieldUser = 'userObject';
  constructor(
    private JwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('token not found');
    }

    try {
      const payload = await this.JwtService.verifyAsync<JwtPayload>(token);
      request[AuthGuard.requestFieldUser] = payload.idUsuario;
    } catch (error) {
      console.error(
        'error al decodificar token',
        Object.keys(error),
        error.name,
        error.message,
        error.expiredAt,
      );
      if (!!error.expiredAt) {
        throw new UnauthorizedException('token expired');
      }
      throw new UnauthorizedException('your token has something bad');
    }

    const user = await this.authService.findUserById(
      request[AuthGuard.requestFieldUser],
    );
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.isActive) throw new UnauthorizedException('User not active');
    request[AuthGuard.requestFieldUser] = user;
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'];
    if (!authorization || typeof authorization != 'string') return undefined;
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
