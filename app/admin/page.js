
'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import UsersTable from '../../components/users/users-table';

function AdminPage() {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const router = useRouter();

    if (!session) {
        router.replace('/registration');
    }

    if (session && !session.user.admin) {
        router.replace('/');
    }

    if (loading) {
        return <p>Loading ...</p>
    }

    return <UsersTable isAdmin={true} />
}

export default AdminPage;

