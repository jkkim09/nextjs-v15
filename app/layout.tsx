'use client';

import './globals.css';
import { Provider } from 'react-redux';
import store from '@/stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from './providers';

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <html lang="ko" suppressHydrationWarning>
          <body>
            <Providers>
              <main>{children}</main>
            </Providers>
          </body>
        </html>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
