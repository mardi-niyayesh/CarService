import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {OnEvent} from "@nestjs/event-emitter";

@Injectable()
export class EmailService {
  constructor(private readonly miler: MailerService) {}

  sendHtmlEmail(to: string, html: string) {
    return this.miler.sendMail({
      to,
      subject: "Reset Password",
      text: "Reset Your password with token",
      html,
    });
  }

  @OnEvent("signup.welcome")
  sendSignupNotif(payload: { email: string }) {
    console.log(payload.email);
  }
}