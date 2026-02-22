import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly miler: MailerService) {}

  sendHtmlEmail(to: string, html: string) {
    return this.miler.sendMail({
      to,
      subject: "Test Email",
      text: "Hello from NestJS + Gmail + Nodemailer",
      html,
    });
  }
}