import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import UsersTable from '../../components/users/users-table';

import permissions from '@/config/permissions';

import Loader from '@/utils/loader';

function AdminPage() {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const [ability, setAbility] = useState()

    useEffect(() => {

        if (session) {
            setAbility(permissions(session.user, true))
        }
    }, [session])

    if (loading)
        return <Loader />

    return (
        <UsersTable
            user={session.user}
            ability={ability}
        />
    )
}

export default AdminPage;
