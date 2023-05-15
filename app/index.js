'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import UsersTable from '../components/users/users-table';

function PublicPage() {

  const { data: session, status } = useSession()

  const loading = status === "loading"

  const router = useRouter();

  if (loading) {
    return <p>Loading ...</p>
  }

  return <UsersTable />
}

export default PublicPage;
