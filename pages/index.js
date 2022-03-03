import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import Signup from '../components/Signup.js';
import Login from '../components/Login.js';

import SvgTeamGrid from '../assets/team-grid.svg';
import SvgYay from '../assets/team-yay.svg';

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
      <div className='main-wrapper index'>
        <div className='index-block to-bottom'>
          <p>Go from this...</p>
          <SvgTeamGrid />
        </div>
        <div className='index-block to-top'>
          <p>... to this!</p>
          <SvgYay />
        </div>
        <div className='index-block'>
          <h3>What our cats are saying:</h3>
          <blockquote>
            <p>Finally a page that puts the I in Team!</p>
            <figcaption>Mittens from H.R.</figcaption>
          </blockquote>
          <blockquote>
            <p>PizzaParty really gets the human into the screen name.</p>
            <figcaption>Dr. Fluff</figcaption>
          </blockquote>
        </div>
        <div className='index-block login to-top'>
          <div className='login-message'>
            {doLogin ? (
              <>
                <p>Welcome back!</p>
                <p>
                  New user?
                  <button
                    type='button'
                    onClick={() => setDoLogin(!doLogin)}
                    className='button-inline'>
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <p>
                  {hasInvite ? (
                    <>
                      {'You were invited to join '}
                      {hasInvite.teamName ? (
                        <span>{hasInvite.teamName + '!'}</span>
                      ) : (
                        'a team!'
                      )}
                    </>
                  ) : (
                    'Sign up to build your team!'
                  )}
                </p>
                {!hasInvite && (
                  <p>
                    Existing user?
                    <button
                      type='button'
                      onClick={() => setDoLogin(!doLogin)}
                      className='button-inline'>
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
