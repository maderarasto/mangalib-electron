import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(8, 'Passwords needs to be at least 6 characters long'),
  passwordConfirm: z.string(),
}).refine(
  (data) => data.password === data.passwordConfirm, {
    message: 'Passwords don\'t match',
    path: ['passwordConfirm']
  }
);

export type SignUpValues = z.infer<typeof signUpSchema>;

export const useSignUpForm = () => useForm<SignUpValues>({
  resolver: zodResolver(signUpSchema),
  defaultValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
});