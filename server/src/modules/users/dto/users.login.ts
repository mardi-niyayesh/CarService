import z from "zod";
import {BaseUserSchema} from "./users.validators";

export const LoginUserSchema = BaseUserSchema.pick({
  email: true,
  password: true,
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;