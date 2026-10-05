import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ComplaintService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CMP-${timestamp}-${random}`;
  }

  async create(createComplaintDto: CreateComplaintDto) {
    const referenceNumber = this.generateReferenceNumber();

    const complaint = await this.prisma.complaint.create({
      data: {
        referenceNumber,
        fullName: createComplaintDto.fullName,
        email: createComplaintDto.email,
        phoneNumber: createComplaintDto.phoneNumber,
        address: createComplaintDto.address,
        complaintType: createComplaintDto.complaintType,
        dateOfIncident: new Date(createComplaintDto.dateOfIncident),
        description: createComplaintDto.description,
        desiredResolution: createComplaintDto.desiredResolution,
        acknowledgment: createComplaintDto.acknowledgment,
        consent: createComplaintDto.consent,
      },
    });

    try {
      await this.emailService.sendComplaintConfirmation(
        createComplaintDto.email,
        createComplaintDto.fullName,
        referenceNumber,
        createComplaintDto,
      );
    } catch (error) {
      console.error('Failed to send confirmation email to user:', error);
    }

    try {
      await this.emailService.sendComplaintToSupportTeam(
        createComplaintDto,
        referenceNumber,
      );
    } catch (error) {
      console.error('Failed to send notification email to support team:', error);
    }

    return {
      message: 'Complaint submitted successfully',
      referenceNumber,
      complaint: {
        id: complaint.id,
        referenceNumber: complaint.referenceNumber,
        fullName: complaint.fullName,
        email: complaint.email,
        complaintType: complaint.complaintType,
        status: complaint.status,
        createdAt: complaint.createdAt,
      },
    };
  }

  async findAll() {
    return this.prisma.complaint.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(referenceNumber: string) {
    const complaint = await this.prisma.complaint.findUnique({
      where: { referenceNumber },
    });

    if (!complaint) {
      throw new Error('Complaint not found');
    }

    return complaint;
  }

  async updateStatus(referenceNumber: string, status: string) {
    const complaint = await this.prisma.complaint.update({
      where: { referenceNumber },
      data: { status },
    });

    return {
      message: 'Complaint status updated successfully',
      complaint,
    };
  }
}