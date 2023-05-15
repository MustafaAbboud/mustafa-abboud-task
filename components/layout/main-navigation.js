'use client'

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';
import { useEffect } from 'react';

function MainNavigation() {

  const { data: session, status } = useSession()

  const loading = status === "loading"

  useEffect(() => {
    console.log(session)
  }, [session])

  useEffect(() => {
    console.log(loading)
  }, [loading])


  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {session && session.user.admin && (
            <li>
              <Link href='/'>Public</Link>
            </li>
          )}
          <li>
            <Link href='/registration'>Register</Link>
          </li>
          <li>
            <Link href='/admin'>Admin</Link>
          </li>
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
