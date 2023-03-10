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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
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
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { RolesTypes } from 'src/common/enum/roles.enum';
@ApiTags('patients')
@Controller('paciente')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}

  @ApiOperation({ summary: 'Crear un registro' })
  @ApiResponse({
    status: 200,
    type: CreatePatientDto,
  })
  @ApiBody({ type: CreatePatientDto })
  @Roles(RolesTypes.PACIENTE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreatePatientDto) {
    return await this.service.create(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Cargar lista los registros' })
  @ApiResponse({
    status: 200,
    type: CreatePatientDto,
  })
  @Get()
  findAll(@Query() query: FilterDTO) {
    return this.service.findAll(query);
  }

  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Historial clinico paciente' })
  @ApiResponse({
    status: 200,
    type: CreatePatientDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Roles(RolesTypes.PACIENTE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('historial/:id')
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePatientDto) {
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
