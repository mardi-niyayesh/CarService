import z from "zod";
import {createZodDto} from "nestjs-zod";
import {BaseUserSchema} from "@/modules/users/dto/users.validators";

/** base validator */
export const ForgotPassword = BaseUserSchema.pick({
  email: true
});

/** type base validator */
export type ForgotPasswordType = z.infer<typeof ForgotPassword>;

/** schema for swagger */
export class ForgotPasswordSchema extends createZodDto(ForgotPassword) {}