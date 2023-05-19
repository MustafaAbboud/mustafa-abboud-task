'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';

import permissions from '@/config/permissions';

function MainNavigation() {

  const { data: session, status } = useSession()

  const loading = status === "loading"

  const router = useRouter();

  const [ability, setAbility] = useState()

  const pathname = usePathname();

  useEffect(() => {

    if (session) {
      setAbility(permissions(session.user, true))
    }
  }, [session])

  function logoutHandler() {
    signOut();
    router.replace('/registration')
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        {!loading &&
          <>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Box sx={{ width: 180, display: 'flex', justifyContent: 'space-between' }}>
                {ability && ability.can('read', 'user') && (
                  <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/'>
                    <MenuItem selected={pathname == "/" && true}>Public</MenuItem>
                  </Link>
                )}
                {!session && (
                  <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/registration'>
                    <MenuItem selected={pathname == "/registration" && true}>Log In</MenuItem>
                  </Link>
                )}
                {ability && ability.can('manage', 'user') && (
                  <Link style={{ textDecoration: 'none', color: '#ffffff' }} href='/admin'>
                    <MenuItem selected={pathname == "/admin" && true}>Admin</MenuItem>
                  </Link>
                )}
              </Box>
            </Box>
            {session && (
              <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            )}
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
