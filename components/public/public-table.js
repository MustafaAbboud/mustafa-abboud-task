import { useEffect, useState } from 'react';

function PublicTable() {

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

    useEffect(() => {
        qryUsers()
    }, [])


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
            </div>
        </section>
    );
}

export default PublicTable;
