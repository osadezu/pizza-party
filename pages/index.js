import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import Signup from '../components/Signup.js';
import Login from '../components/Login.js';

import SvgGrid from '../public/images/team-grid.svg';
import SvgYay from '../public/images/team-yay.svg';

export default function Home() {
  const router = useRouter();
  const [doLogin, setDoLogin] = useState(false);
  const [hasInvite, setHasInvite] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      if ('login' in router.query) setDoLogin(true);

      // Load invite details from link
      // TODO: THIS INVITE IMPLEMENTATION IS NOT SECURE!
      // Link must contain a randomized key and the validity must be verified in the backend.
      if ('signUp' in router.query && router.query.invite.length) {
        setHasInvite({
          invite: parseInt(router.query.invite),
          teamName: router.query.teamName?.length
            ? router.query.teamName
            : null,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query?.login]);

  return (
    <>
      <Head>
        <title>PizzaParty</title>
      </Head>
      <div className='index-wrapper'>
        <div className='index-left'>
          <p>Go from this...</p>
          <SvgGrid />
          <p>... to this!</p>
          <SvgYay />
          <p>In seconds!</p>
        </div>
        <div className='index-right'>
          <div className='login-message'>
            {doLogin ? (
              <>
                <p>Welcome back!</p>
                <p>
                  New user?
                  <button type='button' onClick={() => setDoLogin(!doLogin)}>
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <p>
                  {hasInvite
                    ? `You were invited to join ${
                        hasInvite.teamName + ' !' ?? 'a team!'
                      }`
                    : 'Sign up to build your team!'}
                </p>
                {!hasInvite && (
                  <p>
                    Existing user?
                    <button
                      type='button'
                      className=''
                      onClick={() => setDoLogin(!doLogin)}>
                      Log In
                    </button>
                  </p>
                )}
              </>
            )}
          </div>
          {doLogin ? <Login /> : <Signup hasInvite={hasInvite?.invite} />}
        </div>
      </div>
    </>
  );
}
