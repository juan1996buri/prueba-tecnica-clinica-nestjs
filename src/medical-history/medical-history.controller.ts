import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterDTO } from 'src/common/dto/filter.dto';
import { Roles } from 'src/users/decorator/roles.decorator';
import { RolesTypes } from 'src/common/enum/roles.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/users/guard/roles.guard';

@ApiTags('medical-history')
@Controller('historial-clinico')
export class MedicalHistoryController {
  constructor(private readonly service: MedicalHistoryService) {}

  @ApiOperation({ summary: 'Historial clinico' })
  @ApiResponse({
    status: 200,
    type: CreateMedicalHistoryDto,
  })
  @ApiBody({ type: CreateMedicalHistoryDto })
  @Roles(RolesTypes.MEDICO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateMedicalHistoryDto) {
    return await this.service.create(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Cargar historial medico' })
  @ApiResponse({
    status: 200,
    type: CreateMedicalHistoryDto,
  })
  @Roles(RolesTypes.MEDICO, RolesTypes.HOSPITAL, RolesTypes.PACIENTE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Query() query: FilterDTO) {
    return this.service.findAll(query);
  }

  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Buscar registro del medico' })
  @ApiResponse({
    status: 200,
    type: CreateMedicalHistoryDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Actualizar registro' })
  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateMedicalHistoryDto,
  ) {
    return this.service.update(id, updateUserDto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Eliminar registro' })
  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
