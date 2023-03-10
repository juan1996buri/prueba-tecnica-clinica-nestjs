import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User as UserEntity } from 'src/infraestructure/user.entity';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserEntity,
  ) {
    const data = await this.authService.login(user, res);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario logeado con exito',
      ...data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
