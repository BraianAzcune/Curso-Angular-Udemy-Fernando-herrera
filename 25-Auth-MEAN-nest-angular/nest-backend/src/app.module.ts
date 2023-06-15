import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
const envFilePath =
  process.env.NODE_ENV === undefined ? '.env' : '.env.' + process.env.NODE_ENV;
console.log('Iniciando con enviroment= ', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    // MongooseModule.forRoot(process.env['MONGO_URL'], {
    //   dbName: process.env.MONGO_DB_NAME,
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URL'),
        dbName: config.get('MONGO_DB_NAME'),
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('db-name=', process.env.MONGO_DB_NAME);
  }
}
