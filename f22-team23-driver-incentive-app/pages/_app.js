import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows
