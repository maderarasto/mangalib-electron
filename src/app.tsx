import { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuth";
import { supabase } from "./lib/supabase";
import { Spinner } from "./components/shadcn/spinner";
import { LibraryScreen } from "./screens/library";
import { AuthScreen } from "./screens/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {data} = supabase.auth.onAuthStateChange((_, session) => {
      console.log(session);
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    }
  }, []);

  if (isLoading) {
    return(
      <div className="flex justify-center items-center w-screen h-screen">
        <Spinner className="size-10" />
      </div>
    );
  }

  return !!session 
    ? (
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
        <Toaster />
      </QueryClientProvider>
    ) 
    : <AuthScreen />;
}