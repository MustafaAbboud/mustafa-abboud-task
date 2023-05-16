'use-client'

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
import UserWindow from './user-window';

import Loader from '@/utils/loader';

function UsersTable(props) {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const isAdmin = props.isAdmin

    const [users, setUsers] = useState([{}])
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [userToEdit, setUserToEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function qryUsers() {

        setIsLoading(true)
        const response = await fetch('/api/users', {
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        setUsers(data.result)
        setIsLoading(false)
    }

    async function delUser(id) {

        setIsLoading(true)
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

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        qryUsers()
        setIsLoading(false)
    }

    function openEditWindow(user) {

        setUserToEdit(user)
        setEditIsOpen(true)
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
                                        <IconButton onClick={() => openEditWindow(user)}>
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

            {editIsOpen && (
                <UserWindow
                    user={userToEdit}
                    qryUsers={qryUsers}
                />
            )}

            {isLoading && <Loader />}
        </Box>
    );
}

export default UsersTable;
