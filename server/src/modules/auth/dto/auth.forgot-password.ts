import z from "zod";
import {createZodDto} from "nestjs-zod";
import {BaseUserSchema} from "@/modules/users/dto/users.validators";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";

export type ForgotApiResponse = { email: string; time: string; timeNumber: number; };

/** base validator */
export const ForgotPassword = BaseUserSchema.pick({
  email: true
});

/** type base validator */
export type ForgotPasswordType = z.infer<typeof ForgotPassword>;

/** schema for swagger */
export class ForgotPasswordSchema extends createZodDto(ForgotPassword) {}

export class OkForgotPasswordRes extends getBaseOkResponseSchema<ForgotApiResponse>({
  path: "/auth/forget-password",
  response: {
    message: "Email sent successfully, Please check your inbox",
    data: {
      email: "user@exmaple.com",
      time: "15 minutes left",
      timeNumber: 15
    }
  }
}) {}

export class ConflictForgotPasswordRes extends getNormalErrorResponse(
  "A password reset token is already active. Please check your email.",
  409
) {}