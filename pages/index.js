import Head from 'next/head';
import Image from 'next/image';

import Signup from '../components/Signup.js';

export default function Home() {
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
          <Signup />
        </div>
      </div>
    </>
  );
}
