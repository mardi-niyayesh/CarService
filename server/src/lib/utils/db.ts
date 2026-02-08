import z from 'zod';

/** date for responses */
export const date = new Date();

export function formatZodError(error: z.ZodError) {
  return error?.issues?.map(i => ({
    fields: i.path.join(", "),
    message: i.message,
  }));
}