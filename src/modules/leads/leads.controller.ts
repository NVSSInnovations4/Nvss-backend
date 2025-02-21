import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { Lead } from './leads.entity';
import { CreateLeadDto } from './dto/create.dto';
import { Response } from 'express';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadService: LeadsService) {}

  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'Lead successfully created',
    type: Lead,
  })
  @Post()
  async createLead(@Body() createLeadDto: CreateLeadDto, @Res() res: Response) {
    try {
      const checkIfLeadExist = await this.leadService.getLeadByEmail(
        createLeadDto.email,
      );

      if (checkIfLeadExist) {
        res.status(500).send('Active Lead exists with Same email');
      }
      const response = await this.leadService.createLead(
        createLeadDto.name,
        createLeadDto.email,
        createLeadDto.phone,
        createLeadDto.message,
      );

      return response;
    } catch (error) {
      console.error('Error in Controller', error.messsage);
    }
  }

  @ApiOperation({ summary: 'Get all leads' })
  @ApiResponse({ status: 200, description: 'List of leads', type: [Lead] })
  @Get()
  async getAllLeads() {
    return this.leadService.getAllLeads();
  }

  @ApiOperation({ summary: 'Get lead by ID' })
  @ApiResponse({ status: 200, description: 'Lead details', type: Lead })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  @Get(':id')
  async getLeadById(@Param('id') id: string) {
    return this.leadService.getLeadById(id);
  }

  @ApiOperation({ summary: 'Update lead status' })
  @ApiResponse({ status: 200, description: 'Lead status updated', type: Lead })
  @Patch(':id')
  async updateLeadStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: any,
  ) {
    return this.leadService.updateLeadStatus(id, updateStatusDto.status);
  }

  @ApiOperation({ summary: 'Delete a lead' })
  @ApiResponse({ status: 200, description: 'Lead deleted successfully' })
  @Delete(':id')
  async deleteLead(@Param('id') id: string) {
    await this.leadService.deleteLead(id);
    return { message: 'Lead deleted successfully' };
  }
}
