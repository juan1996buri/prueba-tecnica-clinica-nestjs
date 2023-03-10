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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterDTO } from 'src/common/dto/filter.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUserDTO } from './dto/active-user.dto';
import { EditPasswordDTO } from './dto/edit-password.dto';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesTypes } from 'src/common/enum/roles.enum';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Crear un registro' })
  @ApiResponse({
    status: 200,
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.service.create(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Activar Cuenta' })
  @ApiResponse({
    status: 200,
  })
  @ApiBody({ type: ActiveUserDTO })
  @Post('activar')
  async active(@Body() dto: ActiveUserDTO) {
    return await this.service.active(dto);
  }
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'Cargar lista los registros' })
  @ApiResponse({
    status: 200,
    type: CreateUserDto,
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //-------------------------------------------------------------------

  @ApiOperation({ summary: 'Buscar registro' })
  @ApiResponse({
    status: 200,
    type: CreateUserDto,
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
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
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
  //-------------------------------------------------------------------
  @ApiOperation({ summary: 'cambiar contraseña' })
  @ApiResponse({
    status: 200,
  })
  @ApiBody({
    type: EditPasswordDTO,
  })
  @Roles(RolesTypes.HOSPITAL, RolesTypes.MEDICO, RolesTypes.PACIENTE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('cambio-password')
  async editPassword(@Body() dto: EditPasswordDTO) {
    return await this.service.editPassword(dto);
  }
}
