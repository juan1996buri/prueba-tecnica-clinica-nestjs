import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from 'src/infraestructure/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      user,
      token,
    };
  }
}
