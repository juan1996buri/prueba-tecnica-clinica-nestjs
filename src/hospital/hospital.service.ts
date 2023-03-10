import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudMessage } from 'src/common/crud-message.enum';
import { Hospital } from 'src/infraestructure/hospital.entity';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { FilterDTO } from 'src/common/dto/filter.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { User } from 'src/infraestructure/user.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private readonly repository: Repository<Hospital>,
  ) {}

  async create(dto: CreateHospitalDto) {
    try {
      let value = this.repository.create(dto);
      return await this.repository.save(value).then((data) => {
        return {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.PostSuccess],
          data,
          count: 1,
        };
      });
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.driverError.detail],
        data: [],
        count: 0,
      };
    }
  }

  async findAll(query: FilterDTO) {
    const queryBuilder = this.repository.createQueryBuilder('table');
    const newCq = queryBuilder.innerJoinAndSelect('table.user', 'user');
    newCq.orderBy(`table.${query.orderBy ? query.orderBy : 'id'} `, 'ASC');
    return paginate(queryBuilder, query);
  }

  async findOne(id: string) {
    try {
      const data = await this.repository
        .createQueryBuilder('h')
        .leftJoinAndSelect('h.doctor', 'doctor')
        .where('h.id = :id', { id })
        .getMany();

      if (data.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.GetSuccess],
          data,
          count: data.length,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: [CrudMessage.GetError],
      };
    }
  }

  async update(id: string, dto: UpdateHospitalDto) {
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
          count: 1,
        };
  }
}
