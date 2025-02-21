import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({ example: 'John Doe', description: 'Full Name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email Address' })
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone Number', required: false })
  phone?: string;

  @ApiProperty({ example: 'I am interested in your product', description: 'Message', required: false })
  message?: string;
}

export class UpdateLeadStatusDto {
  @ApiProperty({ example: 'contacted', description: 'Lead Status' })
  status: 'new' | 'contacted' | 'converted' | 'lost';
}
