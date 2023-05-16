
'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import UsersTable from '../../components/users/users-table';

function AdminPage() {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const router = useRouter();

    if (loading) {
        return <p>Loading ...</p>
    }

    if (!session) {
        router.replace('/registration');
    }

    if (session && !session.user.admin) {
        router.replace('/');
    }

    return <UsersTable isAdmin={true} />
}

export default AdminPage;

