import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

export default function Navigation() {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  // console.log('Nav logging pathame:', router.pathname);

  if (!user?.isLoggedIn) {
    return <div id='navigation'></div>;
  }

  return (
    <div id='navigation'>
      <ul>
        <li>
          <h3>Team Time</h3>
        </li>
        <li className='link'>
          <Link href='/team'>
            <a className={router.pathname == '/team' ? 'active' : null}>
              Rumpus
            </a>
          </Link>
        </li>
        <li className='link'>
          <p>🚧 Map</p>
          <span>coming soon!</span>
        </li>
        {user?.isAdmin && (
          <li className='link'>
            <Link href='/team/edit'>
              <a className={router.pathname == '/team/edit' ? 'active' : ''}>
                Edit Team
              </a>
            </Link>
          </li>
        )}
        {/* <li>
          <Link href='/team/members'>
            <a className={router.pathname == '/team/members' ? 'active' : ''}>
              Members
            </a>
          </Link>
        </li> */}
        <li>
          <h3>Me Time</h3>
        </li>
        <li className='link'>
          <Link href='/member/edit'>
            <a className={router.pathname == '/member/edit' ? 'active' : ''}>
              Profile
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
