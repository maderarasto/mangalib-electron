import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const resetPasswordSchema = z.object({
  email: z.email()
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordForm = () => useForm<ResetPasswordValues>({
  resolver: zodResolver(resetPasswordSchema),
  defaultValues: {
    email: ''
  }
});