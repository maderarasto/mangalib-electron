import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import React, { FormEvent } from "react";

import type { AuthNestedScreen } from "./auth";
import { SignInValues, useSignInForm } from "@/hooks/form/useSignInForm";
import { Spinner } from "@/components/shadcn/spinner";
import { Controller } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react";
import clsx from "clsx";

type SignInProps = {
  onChangeAuthScreen?: (screen: AuthNestedScreen) => void
}

export const SignIn: React.FC<SignInProps> = ({
  onChangeAuthScreen
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError
  } = useSignInForm();

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="gap-4 py-6">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FieldGroup className="gap-2">
                    <FieldLabel className="text-sm">Email</FieldLabel>
                    <Input
                      className={clsx(errors.email && 'ring-1 ring-red-500 focus-visible:ring-red-500')}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    {errors.email && (
                      <FieldError className="flex items-center gap-1 text-xs">
                        <AlertCircleIcon size="12" />
                        {errors.email.message}
                      </FieldError>
                    )}
                  </FieldGroup>
                )}  
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FieldGroup className="gap-2">
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      type="password"
                      value={field.value}
                    />
                    <div className="flex justify-end">
                      <span className="text-sm text-muted-foreground">Forgotten password?</span>
                    </div>
                  </FieldGroup>
                )}
              />
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