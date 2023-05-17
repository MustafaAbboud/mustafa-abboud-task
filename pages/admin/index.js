'use client'

import UsersTable from '../../components/users/users-table';

function AdminPage() {

    return <UsersTable isAdmin={true} />
}

export default AdminPage;

