import '@/styles/globals.css';
import Header from '@/pages/components/Header';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto h-screen">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
