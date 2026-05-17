import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const useSignInForm = () => useForm<SignInValues>({
  resolver: zodResolver(signInSchema),
  defaultValues: {
    email: '',
    password: '',
  }
});