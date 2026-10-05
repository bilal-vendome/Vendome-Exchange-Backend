import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@ApiTags('complaints')
@Controller('complaints')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new complaint' })
  @ApiResponse({ status: 201, description: 'Complaint submitted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateComplaintDto })
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintService.create(createComplaintDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all complaints' })
  @ApiResponse({ status: 200, description: 'Complaints retrieved successfully' })
  async findAll() {
    return this.complaintService.findAll();
  }

  @Get(':referenceNumber')
  @ApiOperation({ summary: 'Get complaint by reference number' })
  @ApiParam({ name: 'referenceNumber', description: 'Complaint reference number' })
  @ApiResponse({ status: 200, description: 'Complaint retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Complaint not found' })
  async findOne(@Param('referenceNumber') referenceNumber: string) {
    return this.complaintService.findOne(referenceNumber);
  }

  @Put(':referenceNumber/status')
  @ApiOperation({ summary: 'Update complaint status' })
  @ApiParam({ name: 'referenceNumber', description: 'Complaint reference number' })
  @ApiResponse({ status: 200, description: 'Complaint status updated successfully' })
  @ApiResponse({ status: 404, description: 'Complaint not found' })
  async updateStatus(
    @Param('referenceNumber') referenceNumber: string,
    @Body('status') status: string,
  ) {
    return this.complaintService.updateStatus(referenceNumber, status);
  }
}