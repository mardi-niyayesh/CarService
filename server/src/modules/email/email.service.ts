import {Injectable} from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";
import {MailerService} from "@nestjs-modules/mailer";

interface PayloadEventEmail {
  email: string;
  html: string;
}

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
  sendSignupNotif(payload: PayloadEventEmail) {
    console.log(payload.email);
  }

  @OnEvent("password.changed")
  passwordChanged(payload: PayloadEventEmail) {
    console.log(payload.email);
    console.log(payload.html);
    return this.miler.sendMail({
      to: payload.email,
      subject: "Your Password Successfully Changed.",
      html: payload.html,
    });
  }
}