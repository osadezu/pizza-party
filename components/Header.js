import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

export default function Header() {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  const loggedIn = user?.isLoggedIn;

  return (
    <div id='header-wrapper'>
      <div className='header-titles'>
        <h1 className='app-title'>PizzaParty 🍕</h1>
      </div>
      <div className='header-controls'>
        {loggedIn && (
          <>
            <p>Logged in as {user?.email}</p>
            <button
              type='button'
              className='squirmy'
              onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await (await fetch('/api/logout', { method: 'POST' })).json(),
                  false
                );
                router.push('/');
              }}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
