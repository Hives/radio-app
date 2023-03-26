"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
