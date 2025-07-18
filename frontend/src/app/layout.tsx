import { auth } from '@/libs/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import ReduxWrapper from '../redux/ReduxWrapper';

export const metadata: Metadata = {
  title: 'Next',
  description: 'Basic dashboard with Next.js'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <ReduxWrapper>
      <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
        <body className={'overflow-hidden'}>
          <NextTopLoader showSpinner={false} />
          <NuqsAdapter>
            <Providers session={session}>
              <Toaster richColors expand={true} position='top-right' />
              {children}
            </Providers>
          </NuqsAdapter>
        </body>
      </html>
    </ReduxWrapper>
  );
}
