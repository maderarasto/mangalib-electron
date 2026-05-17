import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import React from "react";

import type { AuthNestedScreen } from "./auth";
import { SignInValues, useSignInForm } from "@/hooks/form/useSignInForm";
import { Spinner } from "@/components/shadcn/spinner";
import { Controller, FormProvider } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { AlertCircleIcon } from "lucide-react";
import clsx from "clsx";
import { ControlInput } from "@/components/control/ControlInput";

type SignInProps = {
  onChangeAuthScreen?: (screen: AuthNestedScreen) => void
}

export const SignIn: React.FC<SignInProps> = ({
  onChangeAuthScreen
}) => {
  const formMethods = useSignInForm();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = formMethods;
  
  const onSubmit = async (values: SignInValues) => {
    const response = await supabase.auth.signInWithPassword(values);
    
    if (response.error?.name === 'AuthApiError') {
      setError('email', { 
        message: response.error.message
      });
    } else if (response.error) {
      setError('email', {
        message: 'Something went wrong. Please try again'
      });
    }
  }

  const handleSignInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-muted">
      <Card className="px-6 py-4">
        <CardHeader>
          <CardTitle className="font-bold text-2xl leading-4">Welcome back</CardTitle>
          <CardDescription>Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent className="w-[340px] space-y-4">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet className="gap-4 py-6">
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
                <div className="flex justify-end">
                  <Button
                    className="px-0 text-muted-foreground"
                    onClick={() => onChangeAuthScreen?.('ResetPassword')}
                    variant="link"
                  >
                    Forgotten password?
                  </Button>
                </div>
              </FieldSet>
              <div className="flex flex-col gap-2">
                <Button>
                  {isSubmitting ? (<Spinner color="white" />): 'Sign In'}
                </Button>
                <Button 
                  onClick={handleSignInWithGoogle}
                  variant="outline" 
                  type="button">
                  Sign In with Google
                </Button>
              </div>
            </form>
          </FormProvider>
          
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm text-muted-foreground">Don't have account yet?</p>
            <Button 
              className="px-0" 
              onClick={() => onChangeAuthScreen?.('SignUp')}
              variant="link"
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}