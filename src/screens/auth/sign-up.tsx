import { SignUpValues, useSignUpForm } from "@/hooks/form/useSignUpForm";
import type { AuthNestedScreen } from "./auth"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shadcn/card";
import { FieldSet } from "@/components/shadcn/field";
import { ControlInput } from "@/components/control/ControlInput";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import {account, ID} from "@/lib/appwrite.ts";
import {AppwriteException} from "appwrite";
import {toast} from "sonner";
import {CircleCheck} from "lucide-react";
import React from "react";

type SignUpProps = {
  onChangeAuthScreen?: (screen: AuthNestedScreen) => void;
}

export const SignUp: React.FC<SignUpProps> = ({
  onChangeAuthScreen
}) => {
  const formMethods = useSignUpForm();
  const { 
    control, 
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = formMethods;

  const onSubmit = async (values: SignUpValues) => {
    const { 
      name, 
      passwordConfirm,
      ...credentials
    } = values;

    try {
      await account.create({
        userId: ID.unique(),
        ...credentials,
        name,
      });

      toast.success('You have successfully created your account. You can sign in now.', {
        duration: 10000,
        closeButton: true,
        icon: <CircleCheck className="size-4 text-green-500" />
      });

      onChangeAuthScreen?.('SignIn');
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (error.type === 'user_already_exists') {
          setError('email', { message: 'A user with given email already exists' });
        } else if (error.message.includes("Invalid `password` param")) {
          setError('password', { message: 'Password must be at least 8 characters long' });
        } else {
          console.error(error.type);
        }
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-muted">
      <Card className="px-6 py-4">
        <CardHeader>
          <CardTitle className="font-bold text-2xl leading-4">Create account</CardTitle>
          <CardDescription>Please enter your details</CardDescription>
        </CardHeader>
        <CardContent className="w-[340px] space-y-4">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet className="gap-4 pt-4 pb-8">
                <ControlInput 
                  control={control} 
                  label="Name" 
                  name="name" 
                />
                <ControlInput 
                  control={control} 
                  label="Email" 
                  name="email" 
                />
                <ControlInput 
                  control={control} 
                  label="Password" 
                  name="password"
                  type="password"
                />
                <ControlInput 
                  control={control} 
                  label="Password (confirm)" 
                  name="passwordConfirm"
                  type="password"
                />
              </FieldSet>
              <div className="flex flex-col gap-2">
                <Button>
                  {isSubmitting ? (<Spinner color="white" />): 'Sign Up'}
                </Button>
              </div>
            </form>
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm text-muted-foreground">Already have account?</p>
              <Button 
                className="px-0" 
                onClick={() => onChangeAuthScreen?.('SignIn')}
                variant="link"
              >
                Sign In
              </Button>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}