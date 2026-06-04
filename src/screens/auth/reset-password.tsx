import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shadcn/card";
import { FieldSet } from "@/components/shadcn/field";
import { FormProvider } from "react-hook-form";
import type { AuthNestedScreen } from "./auth"
import { ResetPasswordValues, useResetPasswordForm } from "@/hooks/form/useResetPasswordForm";
import { ControlInput } from "@/components/control/ControlInput";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";

type ResetPasswordProps = {
  onChangeAuthScreen?: (screen: AuthNestedScreen) => void
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  onChangeAuthScreen
}) => {
  const formMethods = useResetPasswordForm();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit
  } = formMethods;

  const onSubmit = async (values: ResetPasswordValues) => {
    // const {error} = await supabase.auth.resetPasswordForEmail(values.email);
    //
    // if (error) {
    //   // TODO: handle global error
    //   return;
    // }
    //
    // // TODO: handle successful toast
    // onChangeAuthScreen?.('SignIn');
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-muted">
      <Card className="px-6 py-4">
        <CardHeader>
          <CardTitle className="font-bold text-2xl leading-4">Reset password</CardTitle>
          <CardDescription>Send email with link to reset your password</CardDescription>
        </CardHeader>
        <CardContent className="w-[340px] space-y-4">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet className="gap-4 pt-2 pb-12">
                <ControlInput
                  control={control}
                  label="Email"
                  name="email"
                />
              </FieldSet>
              <div className="flex flex-col gap-2">
                <Button>
                  {isSubmitting ? (<Spinner color="white" />): 'Send email'}
                </Button>
                <Button 
                  onClick={() => onChangeAuthScreen?.('SignIn')}
                  variant="outline" 
                  type="button">
                  Back to Login
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}