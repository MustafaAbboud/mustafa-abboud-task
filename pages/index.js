import { useSession } from 'next-auth/react';

import UsersTable from '../components/users/users-table';

import Loader from '@/utils/loader';

function PublicPage() {

  const { data: session, status } = useSession()

  const loading = status === "loading"

  if (loading)
    return <Loader />

  return <UsersTable
    isAdmin={true}
    accessToken={session.user.accessToken}
  />
}

export default PublicPage;
