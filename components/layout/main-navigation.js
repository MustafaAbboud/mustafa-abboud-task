'use client'

import { useEffect } from 'react';
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
          {session && !session.user.admin && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link sx={{ color: '#ffffff' }} href='/'>Public</Link>
            </Typography>
          )}
          {!session && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href='/registration'>
              <Link sx={{ color: '#ffffff' }} href='/registration'>Log In</Link>
            </Typography>
          )}
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
  );
}

export default MainNavigation;
