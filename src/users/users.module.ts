import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infraestructure/user.entity';
import { CommonFilterService } from 'src/common/commonFilterService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CommonFilterService],
  exports: [UsersService],
})
export class UsersModule {}
