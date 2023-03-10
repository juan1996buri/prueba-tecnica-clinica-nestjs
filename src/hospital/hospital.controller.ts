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
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
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

@ApiTags('hospital')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly service: HospitalService) {}

  @ApiOperation({ summary: 'Crear un registro' })
  @ApiResponse({
    status: 200,
    type: CreateHospitalDto,
  })
  @ApiBody({ type: CreateHospitalDto })
  @Roles(RolesTypes.HOSPITAL)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateHospitalDto) {
    return await this.service.create(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Cargar lista los registros' })
  @ApiResponse({
    status: 200,
    type: CreateHospitalDto,
  })
  @Get()
  findAll(@Query() query: FilterDTO) {
    return this.service.findAll(query);
  }

  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Buscar registro de hospital' })
  @ApiResponse({
    status: 200,
    type: CreateHospitalDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador id',
  })
  @Roles(RolesTypes.HOSPITAL)
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateHospitalDto) {
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
