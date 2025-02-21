import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from './leads.entity';
import { MailerService } from '../mailer/mailer.service';
import { MailerModule } from '../mailer/mailer.module';
import { AdminsService } from '../admins/admins.service';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [SequelizeModule.forFeature([Lead]), MailerModule, AdminsModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
