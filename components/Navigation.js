import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

export default function Navigation() {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  // console.log('Nav logging pathame:', router.pathname);

  if (!user?.isLoggedIn) {
    return <div className='absolute right-0 top-20'></div>;
  }

  return (
    <div className='absolute right-0 top-20'>
      <ul>
        <li>
          <h4>Team Time</h4>
        </li>
        <li>
          <Link href='/team'>
            <a className={router.pathname == '/team' ? 'Active' : null}>
              Team Rumpus
            </a>
          </Link>
        </li>
        {user?.isAdmin && (
          <li>
            <Link href='/team/edit'>
              <a className={router.pathname == '/team/edit' ? 'Active' : ''}>
                Edit Team
              </a>
            </Link>
          </li>
        )}
        <li>
          <Link href='/team/members'>
            <a className={router.pathname == '/team/members' ? 'Active' : ''}>
              Members
            </a>
          </Link>
        </li>
        <li>
          <Link href='/team/map' className='myClass'>
            Map
          </Link>
        </li>
        <li>
          <h4>Me Time</h4>
        </li>
        <li>
          <Link href='/member/edit'>
            <a className={router.pathname == '/member/edit' ? 'Active' : ''}>
              Member Profile
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
