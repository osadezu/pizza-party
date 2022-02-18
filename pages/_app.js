import { useState } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axios from 'axios';

import Layout from '../components/Layout';

import '../styles/normalize.css';
import '../styles/bootswatch-sketchy.css';
import '../styles/globals.css';
import '../styles/layout.css';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍕</text></svg>'
        /> */}
      </Head>
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((r) => r.json()),
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}

export default MyApp;
