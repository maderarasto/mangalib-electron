import {useEffect, useState} from "react";
import { Spinner } from "./components/shadcn/spinner";
import { LibraryScreen } from "./screens/library";
import { AuthScreen } from "./screens/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import {account} from "@/lib/appwrite.ts";
import {useRealtimeSubscription} from "@/hooks/useRealtimeSubscription.ts";
import {useAuthStore} from "@/store/useAuthStore.ts";

const queryClient = new QueryClient();
export default function App() {
  const authUser = useAuthStore(state => state.user);
  const setAuthUser = useAuthStore(state => state.setUser);
  const [isLoading, _] = useState(false);

  useEffect(() => {
    account.get().then(setAuthUser);
  }, []);

  useRealtimeSubscription('account', ({ events }) => {
    if (events.some(e => e.includes('sessions.*.create'))) {
      account.get().then(setAuthUser);
    }

    if (events.some(e => e.includes('sessions.*.delete'))) {
      setAuthUser(null);
    }
  });

  if (isLoading) {
    return(
      <div className="flex justify-center items-center w-screen h-screen">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!authUser ? (
        <AuthScreen />
      ) : (
        <LibraryScreen />
      )}
      <Toaster />
    </QueryClientProvider>
  );
}