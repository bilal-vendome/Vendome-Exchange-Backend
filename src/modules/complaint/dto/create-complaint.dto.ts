import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum ComplaintType {
  TRANSACTION_PROBLEM = 'transaction_problem',
  SERVICE_ISSUE = 'service_issue',
  FEES_AND_CHARGES = 'fees_and_charges',
  ACCOUNT_ACCESS = 'account_access',
  TECHNICAL_PROBLEM = 'technical_problem',
  FRAUD_SUSPICIOUS_ACTIVITY = 'fraud_suspicious_activity',
  OTHER = 'other',
}

export class CreateComplaintDto {
  @ApiProperty({ example: 'User Full Name' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'user.email@domain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'service_quality', enum: ComplaintType })
  @IsEnum(ComplaintType)
  complaintType: ComplaintType;

  @ApiProperty({ example: '2026-09-23' })
  @IsDateString()
  dateOfIncident: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  acknowledgment: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  consent: boolean;

  @ApiProperty({ example: '+92331234566' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'address' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'none', required: false })
  @IsOptional()
  @IsString()
  desiredResolution?: string;
}