import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FilterDTO } from 'src/common/dto/filter.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/users/decorator/roles.decorator';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesTypes } from 'src/common/enum/roles.enum';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly service: DoctorService) {}

  @ApiOperation({ summary: 'Crear un registro' })
  @ApiResponse({
    status: 200,
    type: CreateDoctorDto,
  })
  @ApiBody({ type: CreateDoctorDto })
  @Roles(RolesTypes.HOSPITAL)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateDoctorDto) {
    return await this.service.create(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Cargar lista los registros' })
  @ApiResponse({
    status: 200,
    type: CreateDoctorDto,
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Buscar registro' })
  @ApiResponse({
    status: 200,
    type: CreateDoctorDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Roles(RolesTypes.MEDICO)
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateDoctorDto) {
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
