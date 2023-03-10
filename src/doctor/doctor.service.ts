import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudMessage } from 'src/common/crud-message.enum';
import { Doctor } from 'src/infraestructure/doctor.entity';
import { CommonFilterService } from 'src/common/commonFilterService';
import { FilterDTO } from 'src/common/dto/filter.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { User } from 'src/infraestructure/user.entity';
import { v4 } from 'uuid';
import { RolesTypes } from 'src/common/enum/roles.enum';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly repository: Repository<Doctor>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
    private commonFilterService: CommonFilterService,
  ) {}

  async create(dto: CreateDoctorDto) {
    try {
      const exitUser = await this.repositoryUser.findOne({
        where: { email: dto.user?.email },
      });

      if (!exitUser) {
        const newUser = await this.repositoryUser.save(dto.user);
        dto.user.otpSecret = v4();
        dto.user = newUser;

        const newDoctor = await this.repository.save(dto);
        return {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.PostSuccess],
          data: newDoctor,
          count: 1,
        };
      } else {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: ['Este usuario ya esta registrado'],
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.driverError.detail],
        data: [],
        count: 0,
      };
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    try {
      const data = await this.repository
        .createQueryBuilder('d')
        .leftJoinAndSelect('d.hospital', 'hospital')
        .leftJoinAndSelect('d.medicalHistory', 'medicalHistory')
        .where('d.id = :id', { id })
        .getMany();

      if (data.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.GetSuccess],
          data,
          count: data.length,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CrudMessage.GetError],
          count: 0,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: [CrudMessage.GetError],
      };
    }
  }

  async update(id: string, dto: UpdateDoctorDto) {
    try {
      let { affected } = await this.repository.update({ id }, dto);
      return affected > 0
        ? {
            statusCode: HttpStatus.OK,
            message: [CrudMessage.UpdateSuccess],
            count: 1,
          }
        : {
            statusCode: HttpStatus.OK,
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
        };
  }
}
