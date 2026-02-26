import {Injectable} from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";
import {MailerService} from "@nestjs-modules/mailer";

interface PayloadEventEmail {
  email: string;
  html: string;
  subject?: string;
}

@Injectable()
export class EmailService {
  private readonly defaultReplay: string = process.env.EMAIL_REPLAY!;
  private readonly defaultFrom: string = process.env.EMAIL_FROM!;

  constructor(private readonly miler: MailerService) {}

  @OnEvent("signup.welcome")
  @OnEvent("login.welcome")
  signupWelcome(payload: PayloadEventEmail) {
    return this.miler.sendMail({
      to: payload.email,
      html: payload.html,
      subject: payload.subject,
      replyTo: this.defaultReplay,
      from: this.defaultFrom,
    });
  }

  forgotPassword(to: string, html: string) {
    return this.miler.sendMail({
      to,
      subject: "Reset Password - Car Service",
      text: "Reset Your password with token",
      html,
      replyTo: this.defaultReplay,
      from: this.defaultFrom,
    });
  }

  @OnEvent("password.changed")
  passwordChanged(payload: PayloadEventEmail) {
    return this.miler.sendMail({
      to: payload.email,
      subject: payload.subject || "Your Password Successfully Changed - Car Service",
      html: payload.html,
      replyTo: this.defaultReplay,
      from: this.defaultFrom,
    });
  }
}