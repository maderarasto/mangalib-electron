import {Button} from "@/components/shadcn/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/shadcn/card";
import {FieldSet} from "@/components/shadcn/field";
import React from "react";

import type {AuthNestedScreen} from "./auth";
import {SignInValues, useSignInForm} from "@/hooks/form/useSignInForm";
import {Spinner} from "@/components/shadcn/spinner";
import {FormProvider} from "react-hook-form";
import {ControlInput} from "@/components/control/ControlInput";
import {account} from "@/lib/appwrite.ts";
import {AppwriteException, OAuthProvider} from "appwrite";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {toast} from "sonner";
import {CircleCheck} from "lucide-react";

type SignInProps = {
  onChangeAuthScreen?: (screen: AuthNestedScreen) => void
}

export const SignIn: React.FC<SignInProps> = ({
  onChangeAuthScreen
}) => {
  const setAuthUser = useAuthStore(state => state.setUser);

  const formMethods = useSignInForm();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = formMethods;
  
  const onSubmit = async (values: SignInValues) => {
    try {
      const signedInUser = await account.get();

      if (signedInUser) {
        setAuthUser(signedInUser);
        return;
      }
    } catch {}

    try {
      await account.createEmailPasswordSession({
        ...values,
      });

      const user = await account.get();

      toast.success('You have been successfully signed in!', {
        duration: 10000,
        closeButton: true,
        icon: <CircleCheck className="size-4 text-green-500" />
      });

      setAuthUser(user);
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (error.type === 'general_argument_invalid') {
          setError('email', { message: 'Invalid credentials' });
        } else {
          setError('email', { message: 'Something went wrong. Please try again' });
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  }

  const handleSignInWithGoogle = () => {
    account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success: 'http://localhost:5173',
      failure: 'http://localhost:5173',
      scopes: ['account']
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
                    type="button"
                  >
                    Forgotten password?
                  </Button>
                </div>
              </FieldSet>
              <div className="flex flex-col gap-2">
                <Button>
                  {isSubmitting ? (<Spinner color="white" />) : 'Sign In'}
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
              type="button"
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}