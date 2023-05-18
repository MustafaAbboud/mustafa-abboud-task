import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/styles/theme';

import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
