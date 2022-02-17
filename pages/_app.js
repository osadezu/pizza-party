import { useState } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axios from 'axios';

import Layout from '../components/Layout';

import '../styles/globals.css';
import '../styles/layout.css';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
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
