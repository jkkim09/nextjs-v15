'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { TooltipProvider } from '@/components/ui/tooltip';
import store from '@/stores/store';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  // 클라이언트에서만 렌더링 보장
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
