import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PolicyDto } from './dto/policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(payload: PolicyDto) {
    const policy = await this.prisma.policy.create({
      data: { ...payload },
    });

    return {
      message: 'Policy created successfully',
      policy
    };
  }

  async findAll() {
    return this.prisma.policy.findMany({
      where: { deletedAt: null },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const policy = await this.prisma.policy.findUnique({
      where: { id, deletedAt: null },
    });

    if (!policy) {
      throw new Error('Policy not found');
    }

    return policy;
  }

  async update(id: string, payload: PolicyDto) {
    const policy = await this.prisma.policy.update({
      where: { id, deletedAt: null },
      data: { ...payload }
    });

    if (!policy) {
      throw new Error('Policy not found');
    }

    return {
      message: 'Policy updated successfully',
      policy
    };
  }

  async delete(id: string) {
    const policy = await this.prisma.policy.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() }
    });

    if (!policy) {
      throw new Error('Policy not found');
    }

    return {
      message: 'Policy deleted successfully',
      policy: null
    };
  }
}