import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Loader from '@/utils/loader';

//user add-edit window only accessed by admins
//props need 
//newMode bool
//user selected to edit, empty if newMode
//qryUsers function
//setUserWindowOpen to close
//accessToken
function UserWindow(props) {

    const newMode = props.newMode
    const user = props.user

    const { _id, name, email, role } = user

    const [selectedRole, setSelectedRole] = useState(role ? role : 'subscriber')
    const [isLoading, setIsLoading] = useState(false)

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function editUser(event) {

        event.preventDefault();

        setIsLoading(true)

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        var user

        if (newMode) {

            const enteredPassword = passwordInputRef.current.value;

            user = {
                _id: _id,
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                role: selectedRole,
            }
        } else {

            user = {
                _id: _id,
                name: enteredName,
                email: enteredEmail,
                role: selectedRole,
            }
        }

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + props.accessToken
            },
        });

        const data = await response.json();

        if (!response.ok) {

            setIsLoading(false)
            toast.error(data.message || 'Something went wrong!');
            return
        }

        if (newMode)
            toast.success('New user add successfully');
        else
            toast.success('Record edited successfully');

        await props.qryUsers()
        setIsLoading(false)
    }

    return (
        <Box sx={{ position: 'absolute', top: 72, width: 'calc(100vw - 25px)', height: 'calc(100vh - 72px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'hsla(0, 0%, 100%, 0.4)' }}>
            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
                pauseOnHover={false}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                <form onSubmit={editUser}>
                    <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', border: 1, borderRadius: '16px', borderColor: 'primary.main', boxShadow: 3, padding: '40px', backgroundColor: 'hsl(0, 0%, 100%)' }}>
                        <Box sx={{ height: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <IconButton sx={{ marginRight: -4 }} onClick={() => props.setUserWindowOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Input sx={{ width: '300px' }} id="standard-basic" placeholder="User Name" required defaultValue={name} inputRef={nameInputRef} />

                        <Input sx={{ width: '300px', marginTop: '20px' }} id="standard-basic" type='email' placeholder="Email" required defaultValue={email} inputRef={emailInputRef} />

                        {newMode && (
                            <Input sx={{ marginTop: '20px' }} id="standard-basic" type='password' placeholder="Password" required inputRef={passwordInputRef} />
                        )}

                        <Select
                            sx={{ marginTop: '20px' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'subscriber'}>Subscriber</MenuItem>
                        </Select>

                        <Box sx={{ marginBottom: '-40px', marginTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                            <Button sx={{ width: '140px' }} type='submit' variant="contained">{newMode ? 'Add User' : 'Edit User'}</Button>
                        </Box>

                    </Box>
                </form>

            </Box>

            {isLoading && <Loader />}
        </Box>
    )
}

export default UserWindow;