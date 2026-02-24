import {Module} from "@nestjs/common";
import {EmailService} from "./email.service";
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        secure: process.env.NODE_ENV === "production",
        port: 587,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}