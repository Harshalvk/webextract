"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
