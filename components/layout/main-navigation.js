'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';

function MainNavigation() {

  const { data: session, status } = useSession()

  const loading = status === "loading"

  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    console.log(session)
    if (session)
      setIsAdmin(session.user.role === 'admin' ? true : false)
  }, [session])

  useEffect(() => {
    console.log(loading)
  }, [loading])


  function logoutHandler() {
    signOut();
    router.replace('/registration')
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {session && (
            <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/'>
              <MenuItem>Public</MenuItem>
            </Link>
          )}
          {!session && (
            <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/registration'>
              <MenuItem>Log In</MenuItem>
            </Link>
          )}
          {session && isAdmin && (
            <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/admin'>
              <MenuItem>Admin</MenuItem>
            </Link>
          )}
        </Box>
        {session && (
          <Button color="inherit" onClick={logoutHandler}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
