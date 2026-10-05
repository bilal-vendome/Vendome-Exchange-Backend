import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendComplaintConfirmation(
    userEmail: string,
    userName: string,
    referenceNumber: string,
    complaintDetails: any,
  ) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complaint Received</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .reference-number { background-color: #e7f3fe; border-left: 6px solid #2196F3; padding: 15px; margin: 20px 0; font-size: 18px; font-weight: bold; }
              .details { margin: 20px 0; }
              .details p { margin: 10px 0; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>Complaint Received</h1>
          </div>
          
          <div class="content">
              <p>Dear ${userName},</p>
              
              <p>Thank you for contacting us. We have received your complaint and it is being reviewed by our support team.</p>
              
              <div class="reference-number">
                  Reference Number: ${referenceNumber}
              </div>
              
              <p>Please save this reference number for future correspondence regarding this complaint.</p>
              
              <div class="details">
                  <p><strong>Complaint Type:</strong> ${complaintDetails.complaintType}</p>
                  <p><strong>Date of Incident:</strong> ${complaintDetails.dateOfIncident}</p>
                  <p><strong>Description:</strong> ${complaintDetails.description}</p>
              </div>
              
              <p>Our team will review your complaint and get back to you within 2-3 business days.</p>
              
              <p>If you have any questions, please contact us using your reference number.</p>
          </div>
          
          <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>&copy; 2024 Domain .COM. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;

    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Complaint Received - Reference #${referenceNumber}`,
      html: htmlContent,
    });
  }

  async sendComplaintToSupportTeam(
    complaintDetails: any,
    referenceNumber: string,
  ) {
    const supportEmail = this.configService.get<string>('mail.supportEmail') || 'support@domain.com';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Complaint Received</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #ff6b6b; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .reference-number { background-color: #fff3cd; border-left: 6px solid #ffc107; padding: 15px; margin: 20px 0; font-size: 18px; font-weight: bold; }
              .details { margin: 20px 0; background-color: white; padding: 15px; border-radius: 5px; }
              .details p { margin: 10px 0; }
              .label { font-weight: bold; color: #555; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .acknowledgment { background-color: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0; }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>New Complaint Received</h1>
          </div>
          
          <div class="content">
              <div class="reference-number">
                  Reference Number: ${referenceNumber}
              </div>
              
              <div class="details">
                  <p><span class="label">Customer Name:</span> ${complaintDetails.fullName}</p>
                  <p><span class="label">Email:</span> ${complaintDetails.email}</p>
                  <p><span class="label">Phone:</span> ${complaintDetails.phoneNumber}</p>
                  <p><span class="label">Address:</span> ${complaintDetails.address}</p>
                  <p><span class="label">Complaint Type:</span> ${complaintDetails.complaintType}</p>
                  <p><span class="label">Date of Incident:</span> ${complaintDetails.dateOfIncident}</p>
                  <p><span class="label">Description:</span></p>
                  <p style="background-color: #f0f0f0; padding: 10px; border-radius: 3px;">${complaintDetails.description}</p>
                  <p><span class="label">Desired Resolution:</span> ${complaintDetails.desiredResolution || 'Not specified'}</p>
              </div>
              
              ${complaintDetails.acknowledgment ? '<div class="acknowledgment"><strong>Customer has acknowledged the terms and conditions.</strong></div>' : ''}
              ${complaintDetails.consent ? '<div class="acknowledgment"><strong>Customer has consented to data processing.</strong></div>' : ''}
              
              <p>Please review this complaint and take appropriate action.</p>
          </div>
          
          <div class="footer">
              <p>This is an automated notification from the complaint system.</p>
              <p>&copy; 2024 Domain .COM. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;
    
    await this.mailerService.sendMail({
      to: supportEmail,
      subject: `New Complaint Received - Reference #${referenceNumber}`,
      html: htmlContent,
    });
  }
}