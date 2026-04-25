"use client";

import { Provider } from "jotai";
import { store } from "../_lib/store";

// Wraps the app with a Jotai Provider bound to the explicit shared store.
// Forces every useAtom call into the same store instance regardless of
// chunking, which silences the "multiple Jotai instances" warning.
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
