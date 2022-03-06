import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../lib/useUser';

import SvgPizzaIcon from '../assets/pizza-icon.svg';
import SvgMenuIcon from '../assets/menu-icon.svg';

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  if (!user?.isLoggedIn) {
    return null;
  }

  return (
    <>
      <div id='navigation' className={showMenu ? '' : 'hidden'}>
        <div className='nav-buttons'>
          <button
            type='button'
            className='menu-toggle boxless'
            onClick={() => setShowMenu(!showMenu)}>
            Menu
          </button>
          <SvgPizzaIcon onClick={() => setShowMenu(false)} />
        </div>
        <ul>
          <li>
            <h3>Team Time</h3>
          </li>
          <li className='link'>
            <Link href='/team'>
              <a
                className={router.pathname == '/team' ? 'active' : null}
                onClick={() => setShowMenu(false)}>
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
                  onClick={() => setShowMenu(false)}>
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
                onClick={() => setShowMenu(false)}>
                Profile
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div
        id='nav-backdrop'
        className={showMenu ? '' : 'hidden'}
        onClick={() => setShowMenu(false)}></div>
    </>
  );
}
