import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudMessage } from 'src/common/crud-message.enum';
import { Patient } from 'src/infraestructure/patient.entity';
import { FilterDTO } from 'src/common/dto/filter.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto) {
    try {
      return await this.repository.save(dto).then((data) => {
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
    return await this.repository.find();
  }

  async findOne(id: string) {
    try {
      const data = await this.repository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.medicalHistory', 'medicalHistory')
        .where('p.id = :id', { id })
        .getMany();
      return {
        message: [CrudMessage.GetSuccess],
        data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [CrudMessage.ErrorServer],
      };
    }
  }

  async update(id: string, dto: UpdatePatientDto) {
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
