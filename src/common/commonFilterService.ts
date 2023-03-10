// common-filter.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilterDTO } from './dto/filter.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CrudMessage } from './crud-message.enum';

@Injectable()
export class CommonFilterService {
  async paginateFilter<T>(paginateF: FilterDTO, repository: Repository<T>) {
    const queryBuilder = repository
      .createQueryBuilder('entity')
      .orderBy(`${paginateF.orderBy ? paginateF.orderBy : 'id'}`, 'ASC');

    let query;

    if (
      (paginateF.filterNameColum == null && paginateF.filterTextColum) ||
      (paginateF.filterNameColum && paginateF.filterTextColum == null)
    ) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: [
          'necesitas mandar parametros por filterNameColum y filterTextColum',
        ],
      };
    }

    if (paginateF.filterNameColum && paginateF.filterTextColum) {
      const metadata = repository.metadata;
      let columExit = metadata.columns.find(
        (colum) => colum.propertyName === paginateF.filterNameColum,
      );
      if (!columExit) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CrudMessage.GetError],
        };
      }
      query = queryBuilder.where(
        `${paginateF.filterNameColum} like '%${paginateF.filterTextColum}%'`,
      );

      if ((await query.execute()) == 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CrudMessage.GetError],
        };
      }

      return paginate<T>(query, paginateF);
    }

    return paginate<T>(queryBuilder, paginateF);
  }
}
