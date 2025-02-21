import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.TECH_EMAIL_PROVIDER,
      auth: {
        user: process.env.TECH_EMAIL,
        pass: process.env.TECH_EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(data: any, to: string): Promise<void> {
    console.log(`Sending email to ${to}...`);

    const mailOptions = {
      from: process.env.TECH_EMAIL,
      to,
      subject: '🚀 New Lead Registered!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
          <h2 style="color: #dc3545;">🚀 New Lead Alert! A Potential Client Has Reached Out</h2>
    
          <p style="font-size: 16px; color: #333;">
            A new lead has just been submitted. Please review the details below and follow up promptly.
          </p>
    
          <h3 style="color: #007bff;">📌 Lead Details:</h3>
          <div style="background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
            <p><strong>👤 Name:</strong> ${data.name}</p>
            <p><strong>📧 Email:</strong> ${data.email}</p>
            <p><strong>📞 Phone:</strong> ${data.phone}</p>
            <p><strong>📝 Message:</strong></p>
            <p style="background: #f8f9fa; padding: 10px; border-left: 4px solid #28a745; font-style: italic;">${data.message}</p>
          </div>
    
          <p style="font-size: 16px; color: #333;">
            <strong>Action Required:</strong> Please contact the lead as soon as possible and provide assistance as needed.
          </p>
    
          <p style="font-size: 16px; color: #555; margin-top: 20px;">
            Best Regards, <br>
            <strong>The Admin Team</strong> <br>
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  }

  async sendClientMail(to: string, fullname: string): Promise<void> {
    const mailOptions = {
      from: process.env.TECH_EMAIL,
      to,
      subject: '📩 We’ve Received Your Inquiry!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #007bff;">Thank You for Reaching Out, ${fullname}! 🙌</h2>
    
          <p style="font-size: 16px; color: #333;">
            We have received your inquiry and our team is already reviewing your message. One of our representatives will get in touch with you soon.
          </p>
          
          <p style="font-size: 16px; color: #333;">
            If you have any urgent queries, feel free to <a href="mailto:${process.env.TECH_EMAIL}" style="color: #007bff;">email us</a> directly. We look forward to assisting you!
          </p>
    
          <p style="font-size: 16px; color: #555; margin-top: 20px;">
            Best Regards, <br>
            <strong>The NVSS Team</strong> <br>
            
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Client email sent successfully to ${to}`);
    } catch (error) {
      console.error('Error sending client email:', error.message);
    }
  }
}
