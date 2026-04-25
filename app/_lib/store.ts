"use client";

import { createStore } from "jotai";

// Single shared Jotai store for the app. Created explicitly (rather than
// relying on getDefaultStore) so React-hook reads via <Provider store={…}>
// and module-scope writes via store.set both go through the same instance,
// even if the bundler splits jotai into multiple chunks.
export const store = createStore();
