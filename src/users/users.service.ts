import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudMessage } from 'src/common/crud-message.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/infraestructure/user.entity';
import { CommonFilterService } from 'src/common/commonFilterService';
import { FilterDTO } from 'src/common/dto/filter.dto';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { ActiveUserDTO } from './dto/active-user.dto';
import { EditPasswordDTO } from './dto/edit-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private commonFilterService: CommonFilterService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      let value = await this.repository.findOne({
        where: { email: dto.email },
      });

      if (value && value?.status === false) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Ya tenias cuenta pero no esta activada'],
          otpSecret: value.otpSecret,
          email: value.email,
        };
      }

      if (!value) {
        dto.password = await bcrypt.hash(dto.password, 10);
        dto.otpSecret = v4();
        return await this.repository.save(dto).then((data) => {
          return {
            statusCode: HttpStatus.OK,
            message: ['activa la cuenta con estos datos'],
            otpSecret: data.otpSecret,
            email: data.email,
          };
        });
      }
      return {
        statusCode: HttpStatus.CONFLICT,
        message: [CrudMessage.PostError],
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [CrudMessage.ErrorServer],
        data: [],
        count: 0,
      };
    }
  }

  async findAll() {
    const data = await this.repository.find();
    if (data.length > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: [CrudMessage.GetSuccess],
        data,
        count: data.length,
      };
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: [CrudMessage.GetError],
      count: 0,
    };
  }

  async active(dto: ActiveUserDTO) {
    const existUser = await this.repository.findOne({
      where: { email: dto.email, otpSecret: dto.otpSecret },
    });

    if (!existUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['el otp o el email son incorrectas'],
      };
    } else {
      existUser.status = true;
      return await this.repository.save(existUser).then((data) => {
        return {
          statusCode: HttpStatus.OK,
          message: [`tu usuario ${data.email} a sido activado con exito`],
        };
      });
    }
  }

  async findOne(id: string) {
    let value = await this.repository.find({ where: { id } });
    return value
      ? {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.GetSuccess],
          data: value,
          count: 1,
        }
      : {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CrudMessage.GetError],
        };
  }

  async update(id: string, dto: CreateUserDto) {
    try {
      let { affected } = await this.repository.update({ id }, dto);
      return affected > 0
        ? {
            statusCode: HttpStatus.OK,
            message: [CrudMessage.UpdateSuccess],
            count: 1,
          }
        : {
            statusCode: HttpStatus.BAD_REQUEST,
            message: [CrudMessage.UpdateError],
          };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [CrudMessage.ErrorServer],
      };
    }
  }

  async remove(id: string) {
    let value = await this.repository.findOne({ where: { id } });
    return value
      ? await this.repository.delete({ id }).then(() => {
          return {
            statusCode: HttpStatus.OK,
            message: [CrudMessage.DeleteError],
            count: 1,
          };
        })
      : {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.DeleteError],
          count: 1,
        };
  }

  async findOneBy(email: string) {
    const user = await this.repository.findOne({
      where: { email, status: true },
    });

    return user;
  }

  async editPassword(dto: EditPasswordDTO) {
    const user = await this.repository.findOne({ where: { email: dto.email } });
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: [CrudMessage.GetError],
      };
    }
    if (user && (await bcrypt.compare(dto.passwordOld, user.password))) {
      const passport = await bcrypt.hash(dto.passwordNew, 10);
      user.password = passport;
      await this.repository.save(user);
      return {
        statusCode: HttpStatus.OK,
        message: [`Contraseña cambiada con exito`],
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: [`El usuario o la contraseña esta incorrecto`],
      };
    }
  }
}
