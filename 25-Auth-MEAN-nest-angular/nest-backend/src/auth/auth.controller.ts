import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginResponse } from './interfaces/login-response';
import { AuthGuard } from './guards/auth.guard';
import { UserFromToken } from 'src/decorators/user-id.decorators';
import { User } from './entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUser: LoginUser) {
    return await this.authService.login(loginUser);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return await this.authService.register(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@UserFromToken() userId: User) {
    console.log('controller findAll', userId);

    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
