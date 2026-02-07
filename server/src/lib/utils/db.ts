import z from 'zod';

export function formatZodError(error: z.ZodError) {
  return error?.issues?.map(i => ({
    fields: i.path.join(", "),
    message: i.message,
  }));
}