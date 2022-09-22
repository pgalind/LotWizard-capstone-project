import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows
