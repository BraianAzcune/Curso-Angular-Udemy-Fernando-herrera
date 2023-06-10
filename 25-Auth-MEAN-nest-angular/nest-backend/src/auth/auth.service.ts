import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Document } from 'mongoose';
import { LoginUser } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  /**
   *Registra a un usuario "create" y hace un login automatico.
   * @param createUserDto CreateUserDto
   */
  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const user = await this.create(createUserDto);
    return this.successLogin(user);
  }

  async login(loginUser: LoginUser): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (user == null) {
      // aunque sabemos que fallo el email, no esta correcto emitir la informacion de que dicho email no existe.
      throw new UnauthorizedException([
        'credenciales erroneas, verifique email y password',
      ]);
    }
    if ((await bcrypt.compare(loginUser.password, user.password)) == false) {
      throw new UnauthorizedException([
        'credenciales erroneas, verifique email y password',
      ]);
    }
    return this.successLogin(user as unknown as Document<User>);
  }

  async successLogin(user: Document<User>): Promise<LoginResponse> {
    const { password: _, ...rest } = user.toJSON();

    return {
      token: await this.getJwtToken({
        idUsuario: rest._id as unknown as string,
      }),
      user: rest as Omit<User, 'password'>,
    };
  }

  async getJwtToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async create(createUserDto: CreateUserDto): Promise<Document<User>> {
    try {
      // encriptar password
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      const newUser = new this.userModel(createUserDto);

      const generatedUser = await newUser.save();
      generatedUser.password = undefined;
      return generatedUser as unknown as Document<User>;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`email ya en uso ${createUserDto.email}`);
      }
      this.logger.error('error al crear usuario=' + error);
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    return user;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
