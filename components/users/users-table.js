import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function UsersTable(props) {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const isAdmin = props.isAdmin

    const [users, setUsers] = useState([{}])

    async function qryUsers() {

        const response = await fetch('/api/users', {
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        setUsers(data)
    }

    async function editUser() {

        const user = {
            id: 1,
            name: 'testPatch2',
            email: 'test1@task.com',
            password: '1234',
            admin: false,
        }

        const response = await fetch('/api/users', {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    async function delUser() {

        const user = { id: 1 }

        const response = await fetch('/api/users/', {
            method: 'DELETE',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        qryUsers()
    }, [])

    if (loading) {
        return <p>Loading ...</p>
    }

    return (
        <section>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? 'true' : 'false'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isAdmin && (
                    <div>
                        {/* <button onClick={() => addUser()}>Add User</button> */}
                        <button onClick={() => editUser()}>Edit User</button>
                        <button onClick={() => delUser()}>Delete User</button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default UsersTable;
