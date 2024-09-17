import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(3),
  studentNumber: z
    .string()
    .min(9)
    .max(9)
    .refine((value) => !isNaN(Number(value)) && value.startsWith('90')),
});
