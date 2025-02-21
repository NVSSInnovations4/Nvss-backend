import { Injectable } from '@nestjs/common';
import { AdminEmail } from '../leads/admins.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(AdminEmail) private readonly admins: typeof AdminEmail,
  ) {}

  async findAll() {
    const adminEmails = await this.admins.findAll({
      attributes: ['email'],
      raw: true,
    });
    return adminEmails;
  }
}
