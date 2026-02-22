import z from "zod";
import {createZodDto} from "nestjs-zod";
import {getBaseOkResponseSchema, getNormalErrorResponse} from "@/common";
import {BaseUserSchema} from "@/modules/users/dto/users.validators";

export const ResetPassword = BaseUserSchema.pick({
  password: true
}).extend({
  token: z.string().length(128, {error: 'Token must be exactly 128 characters long'}),
});

export type ResetPasswordType = z.infer<typeof ResetPassword>;

export class ResetPasswordSchema extends createZodDto(ResetPassword) {}

export class OkResetPasswordRes extends getBaseOkResponseSchema<void>({
  path: "/auth/reset-password",
  response: {
    message: "The reset password token has expired. Please request a new one.",
  }
}) {}

export class BadRequestResetPasswordRes extends getNormalErrorResponse(
  "The reset password token has expired. Please request a new one.",
  400
) {}

export class NotFoundResetPasswordRes extends getNormalErrorResponse(
  "Reset password token is invalid or has expired.",
  404
) {}