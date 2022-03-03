import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

import SvgPizzaIcon from '../assets/pizza-icon.svg';
import SvgMenuIcon from '../assets/menu-icon.svg';

export default function Navigation() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { user, mutateUser } = useUser();

  // console.log('Nav logging pathame:', router.pathname);

  if (!user?.isLoggedIn) {
    return null;
  }

  return (
    <div id='navigation' className={show ? '' : 'hidden'}>
      <div className='nav-buttons'>
        <button
          type='button'
          className='menu-toggle'
          onClick={() => setShow(!show)}>
          <h3>Menu</h3>
        </button>
        <SvgPizzaIcon onClick={() => setShow(!show)} />
      </div>
      <ul>
        <li>
          <h3>Team Time</h3>
        </li>
        <li className='link'>
          <Link href='/team'>
            <a
              className={router.pathname == '/team' ? 'active' : null}
              onClick={() => setShow(!show)}>
              Rumpus
            </a>
          </Link>
        </li>
        <li className='link'>
          <p>Map 🚧</p>
          <span>coming soon!</span>
        </li>
        {user?.isAdmin && (
          <li className='link'>
            <Link href='/team/edit'>
              <a
                className={router.pathname == '/team/edit' ? 'active' : ''}
                onClick={() => setShow(!show)}>
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
            <a
              className={router.pathname == '/member/edit' ? 'active' : ''}
              onClick={() => setShow(!show)}>
              Profile
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
