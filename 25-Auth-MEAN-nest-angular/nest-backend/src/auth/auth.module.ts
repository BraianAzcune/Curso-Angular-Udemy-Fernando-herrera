import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // JwtModule.register({
    //   global: true,
    //   secret: process.env['JWT_SEED'],
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SEED'),
          signOptions: {
            // expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
            expiresIn: '60s',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
