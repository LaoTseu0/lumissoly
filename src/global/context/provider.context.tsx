"use client";
// External Libraries
import React, { use, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // dev: This is a state that used by react-query
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 6,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      })
  );

  // Dev: This is a state that switch the language

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
