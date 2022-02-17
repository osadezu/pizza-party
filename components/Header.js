import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

export default function Header() {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  return (
    <div id='header-wrapper'>
      <div className='flex items-end'>
        <h1 className='font-cursive text-7xl mt-4 mx-14'>PizzaParty 🍕</h1>
        <h2 className='relative top-14 font-mono text-4xl font-medium'>
          Your Team Name
        </h2>
      </div>
      <div className='mx-10'>
        {user?.isLoggedIn ? user.email : 'Logged Out'}
        {user?.isLoggedIn && (
          <button
            onClick={async (e) => {
              e.preventDefault();
              mutateUser(await fetch('/api/logout', { method: 'POST' }), false);
              router.push('/');
            }}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
