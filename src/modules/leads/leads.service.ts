import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead } from './leads.entity';
import { MailerService } from '../mailer/mailer.service';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead) private readonly leadModel: typeof Lead,
    private readonly admins: AdminsService,
    private readonly mailer: MailerService,
  ) {}

  async createLead(
    name: string,
    email: string,
    phone?: string,
    message?: string,
  ): Promise<Lead> {
    try {
      const response = await this.leadModel.create({
        name,
        email,
        phone,
        message,
      });

      if (response) {
        const admins = await this.admins.findAll();
        await Promise.all(
          admins.map((admin) => this.mailer.sendMail(response, admin.email)),
        );
        await this.mailer.sendClientMail(email, name);
      }

      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getLeadByEmail(email: string) {
    try {
      const response = await this.leadModel.findOne({
        where: {
          email,
        },
      });

      return response;
    } catch (error) {
      console.error(`Error fetching lead by email: ${email}`, error);
      throw new Error('Could not retrieve lead data');
    }
  }

  async getAllLeads(): Promise<Lead[]> {
    return this.leadModel.findAll();
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return this.leadModel.findByPk(id);
  }

  async updateLeadStatus(
    id: string,
    status: 'new' | 'contacted' | 'converted' | 'lost',
  ): Promise<[number, Lead[]]> {
    return this.leadModel.update(
      { status },
      { where: { id }, returning: true },
    );
  }

  async deleteLead(id: string): Promise<void> {
    await this.leadModel.destroy({ where: { id } });
  }
}
