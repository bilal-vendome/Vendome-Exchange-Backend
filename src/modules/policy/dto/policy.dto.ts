import { ApiProperty } from '@nestjs/swagger';
import { IsString, } from 'class-validator';

export class PolicyDto {
  @ApiProperty({ example: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Name' })
  @IsString()
  file: string;

  @ApiProperty({ example: 'Name' })
  @IsString()
  url: string;
}