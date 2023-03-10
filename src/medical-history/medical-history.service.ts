import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { FilterDTO } from 'src/common/dto/filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from 'src/infraestructure/medical-history.entity';
import { Repository } from 'typeorm';
import { CrudMessage } from 'src/common/crud-message.enum';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly repository: Repository<MedicalHistory>,
  ) {}

  async create(dto: CreateMedicalHistoryDto) {
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
        message: [error?.parameters],
        data: [],
        count: 0,
      };
    }
  }

  async findAll(filter: FilterDTO) {
    const queryBuilder = this.repository
      .createQueryBuilder('table')
      .innerJoinAndSelect('table.doctor', 'doctor')
      .innerJoinAndSelect('table.patient', 'patient')
      .orderBy(`table.${filter.orderBy ? filter.orderBy : 'id'} `, 'ASC');
    return paginate(queryBuilder, filter);
  }

  async findOne(id: string) {
    try {
      const data = await this.repository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.doctor', 'doctor')
        .leftJoinAndSelect('c.patient', 'patient')
        .where('c.id = :id', { id })
        .getMany();

      if (data?.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: [CrudMessage.GetSuccess],
          data,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CrudMessage.GetError],
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [CrudMessage.ErrorServer],
      };
    }
  }

  async update(id: string, dto: UpdateMedicalHistoryDto) {
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
