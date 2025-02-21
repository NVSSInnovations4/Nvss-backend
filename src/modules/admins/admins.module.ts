import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminEmail } from '../leads/admins.entity';

@Module({
  imports: [SequelizeModule.forFeature([AdminEmail])],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
