import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "O campo de email é obrigatório"),
  password: z.string().min(2, "O campo de senha é obrigatório"),
});
