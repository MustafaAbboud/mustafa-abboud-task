import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

        setUsers(data.result)
    }

    async function editUser() {

        const user = {
            id: 3,
            name: 'amiraPatch',
            email: 'amira.maouch@softmachine.co',
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

    async function delUser(id) {

        const body = {
            id: id
        }

        const response = await fetch('/api/users/', {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        qryUsers()
    }

    useEffect(() => {
        qryUsers()
    }, [])

    if (loading) {
        return <p>Loading ...</p>
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                            {isAdmin && (
                                <TableCell>Tools</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user._id}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.admin ? 'true' : 'false'}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <IconButton onClick={() => editUser(user)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => delUser(user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UsersTable;
