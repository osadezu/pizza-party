import { useState } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import Layout from '../components/Layout';

import '../styles/globals.css';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }) {
  // TODO: Rewrite this to use iron-session with swv
  // https://github.com/vvo/iron-session/tree/main/examples/next.js
  const [loggedIn, setLoggedIn] = useState();
  // !!localStorage.getItem('pp-api-token')
  function handleLogin(token) {
    // localStorage.setItem('pp-api-token', token);
    // getUserInfo();
    setLoggedIn(true);
  }

  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
      }}>
      <Layout>
        <Component
          {...pageProps}
          loggedIn={loggedIn}
          handleLogin={handleLogin}
        />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
