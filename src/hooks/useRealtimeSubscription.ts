import {realtime} from "@/lib/appwrite.ts";
import {Channel, Realtime} from "appwrite";
import {useEffect} from "react";

type RealtimeCallback = Parameters<Realtime['subscribe']>[1];
type Subscription = Awaited<ReturnType<Realtime['subscribe']>>;

export const useRealtimeSubscription = (
  channel: string|Channel<any>,
  callback: RealtimeCallback,
) => {
  useEffect(() => {
    let subscription: Subscription|null = null;
    let cancelled = false;

    const setup = async () => {
      subscription = await realtime.subscribe(channel, callback);

      if (cancelled) {
        subscription?.unsubscribe();
      }
    };

    setup();

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    }
  }, [channel]);
}