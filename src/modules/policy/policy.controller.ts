import { Controller, Post, Get, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PolicyService } from './policy.service';
import { PolicyDto } from './dto/policy.dto';

@ApiTags('policies')
@Controller('policies')
export class PolicyController {
  constructor(private policyService: PolicyService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new policy' })
  @ApiResponse({ status: 201, description: 'Policy created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: PolicyDto })
  async create(@Body() payload: PolicyDto) {
    return this.policyService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Get all policies' })
  @ApiResponse({ status: 200, description: 'Policies retrieved successfully' })
  async findAll() {
    return this.policyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get policy by id' })
  @ApiParam({ name: 'id', description: 'Policy Id' })
  @ApiResponse({ status: 200, description: 'Policy retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async findOne(@Param('id') id: string) {
    return this.policyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update policy' })
  @ApiParam({ name: 'id', description: 'Policy Id' })
  @ApiResponse({ status: 200, description: 'Policy updated successfully' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async update(
    @Param('id') id: string,
    @Body() payload: PolicyDto,
  ) {
    return this.policyService.update(id, payload);
  }

  @Delete()
  @ApiParam({ name: 'id', description: 'Policy Id' })
  @ApiResponse({ status: 200, description: 'Policy deleted successfully' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async delete(
    @Param('id') id: string,
  ) {
    return this.policyService.delete(id);
  }
}