import z from 'zod';
import {createZodDto} from "nestjs-zod";

/** base user schema */
export const BaseUserSchema = z.object({
  email: z.email(),
  password: z.string().max(20).min(6).regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
    {error: "password must contain at least one letter and one number"}
  ),
  display_name: z.string().min(3).max(40).optional(),
  age: z.number().min(0).max(120).optional(),
});

/** Create User Validations */
export type CreateUserInput = z.infer<typeof BaseUserSchema>;
export class CreateUserDto extends createZodDto(BaseUserSchema) {}