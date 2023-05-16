'use client'

import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link sx={{ color: '#ffffff' }} href='/'>Public</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href='/registration'>
            <Link sx={{ color: '#ffffff' }} href='/registration'>Register</Link>
          </Typography>
          {session && session.user.admin && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href='/admin'>
              <Link sx={{ color: '#ffffff' }} href='admin'>Admin</Link>
            </Typography>
          )}
          {session && (
            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    // <header className={classes.header}>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link href='/'>Public</Link>
    //       </li>
    //       <li>
    //         <Link href='/registration'>Register</Link>
    //       </li>
    //       {session && session.user.admin && (
    //         <li>
    //           <Link href='/admin'>Admin</Link>
    //         </li>
    //       )}
    //       {session && (
    //         <li>
    //           <button onClick={logoutHandler}>Logout</button>
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    // </header>
  );
}

export default MainNavigation;
