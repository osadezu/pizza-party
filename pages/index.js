import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import Signup from '../components/Signup.js';
import Login from '../components/Login.js';

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
      <div className='h-full grid grid-cols-2'>
        <div className='flex flex-col items-center justify-center'>
          Go from this...
          <Image
            src='/images/plakitten_400x300.jpeg'
            alt='Grid of not-so-happy cartoony characters having a video call.'
            width={400 * 0.8}
            height={300 * 0.8}
          />
          ... to this!
          <Image
            src='/images/plakitten_400x300.jpeg'
            alt="Group of cartoony characters joining in a team celebration with somebody's cat"
            width={400 * 0.8}
            height={300 * 0.8}
          />
          In seconds!
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='flex flex-col items-end'>
            {doLogin ? (
              <>
                <p>Welcome back!</p>
                <p>
                  New user?
                  <button
                    type='button'
                    className='mx-1'
                    onClick={() => setDoLogin(!doLogin)}>
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
                      className='mx-1'
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
