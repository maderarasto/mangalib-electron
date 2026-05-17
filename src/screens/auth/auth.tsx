import { useState } from "react";
import { SignIn } from "./sign-in";

export type AuthNestedScreen = (
  | 'SignIn'
  | 'SignUp'
);

export const AuthScreen: React.FC = () => {
  const [authScreen, setAuthScreen] = useState<AuthNestedScreen>('SignIn');

  const handleChangeScreen = (screen: AuthNestedScreen) => {
    setAuthScreen(screen);
  }

  if (authScreen === 'SignIn') {
    return <SignIn onChangeAuthScreen={handleChangeScreen} />;
  }

  return null;
}