import { z } from "zod";

// WhatsApp is the only optional field; everything else is required.
export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Informe seu nome completo"),
    email: z.email("E-mail inválido"),
    whatsapp: z
      .string()
      .trim()
      .max(20, "WhatsApp muito longo")
      .optional()
      .or(z.literal("")),
    password: z.string().min(8, "A senha precisa de pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

// A study item key, e.g. "domain:1.1", "scenario:3", "exercise:2".
export const progressItemSchema = z.object({
  itemKey: z.string().min(1).max(64),
  completed: z.boolean(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
