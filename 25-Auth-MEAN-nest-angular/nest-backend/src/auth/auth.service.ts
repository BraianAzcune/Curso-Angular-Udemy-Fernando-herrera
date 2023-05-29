import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginUser: LoginUser) {
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (user == null) {
      // aunque sabemos que fallo el email, no esta correcto emitir la informacion de que dicho email no existe.
      throw new UnauthorizedException(
        'credenciales erroneas, verifique email y password',
      );
    }
    if ((await bcrypt.compare(loginUser.password, user.password)) == false) {
      throw new UnauthorizedException(
        'credenciales erroneas, verifique email y password',
      );
    }
    const { password: _, ...rest } = user.toJSON();

    return {
      token: 'hola',
      ...rest,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      // encriptar password
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      const newUser = new this.userModel(createUserDto);

      const generatedUser = await newUser.save();
      generatedUser.password = undefined;
      return generatedUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`email ya en uso ${createUserDto.email}`);
      }
      this.logger.error('error al crear usuario=' + error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
