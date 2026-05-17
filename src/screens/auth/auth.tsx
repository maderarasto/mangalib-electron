import { useState } from "react";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { ResetPassword } from "./reset-password";

export type AuthNestedScreen = (
  | 'SignIn'
  | 'SignUp'
  | 'ResetPassword'
);

export const AuthScreen: React.FC = () => {
  const [authScreen, setAuthScreen] = useState<AuthNestedScreen>('SignIn');

  const handleChangeScreen = (screen: AuthNestedScreen) => {
    setAuthScreen(screen);
  }

  if (authScreen === 'SignIn') {
    return <SignIn onChangeAuthScreen={handleChangeScreen} />;
  } else if (authScreen === 'SignUp') {
    return <SignUp onChangeAuthScreen={handleChangeScreen} />;
  } else if (authScreen === 'ResetPassword') {
    return <ResetPassword onChangeAuthScreen={handleChangeScreen} />;
  }

  return null;
}