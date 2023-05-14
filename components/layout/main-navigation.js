import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // const [session, loading] = useSession();

  // function logoutHandler() {
  //   signOut();
  // }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link href='/'>Public</Link>
          </li>
          <li>
            <Link href='/registration'>Register</Link>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li>
            <Link href='/admin'>Admin</Link>
          </li>
          {/* {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
