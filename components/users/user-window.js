import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Loader from '@/utils/loader';

function UserWindow(props) {

    const user = props.user
    const { _id, name, email, admin } = user

    const [isChecked, setIsChecked] = useState(admin)
    const [isLoading, setIsLoading] = useState(false)

    const nameInputRef = useRef();
    const emailInputRef = useRef();

    async function editUser(event) {

        event.preventDefault();

        setIsLoading(true)

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const admin = isChecked;

        const user = {
            id: _id,
            name: enteredName,
            email: enteredEmail,
            admin: admin,
        }

        const response = await fetch('/api/users', {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            toast.error('Something went wrong!');
            throw new Error(data.message || 'Something went wrong!');
        }

        toast.success('Record edited successfully');
        props.qryUsers()
        setIsLoading(false)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
                pauseOnHover={false}
            />
            <form onSubmit={editUser}>
                <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', border: 1, borderRadius: '16px', borderColor: 'primary.main', boxShadow: 3, padding: '40px' }}>

                    <Input sx={{ width: '300px' }} id="standard-basic" placeholder="User Name" required defaultValue={name} inputRef={nameInputRef} />

                    <Input sx={{ width: '300px', marginTop: '20px' }} id="standard-basic" placeholder="Email" required defaultValue={email} inputRef={emailInputRef} />

                    <FormControlLabel sx={{ width: '300px', marginTop: '20px' }} control={<Checkbox checked={isChecked} />} label="Admin" onChange={() => setIsChecked(!isChecked)} />

                    <Box sx={{ marginBottom: '-40px', marginTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                        <Button sx={{ width: '140px' }} type='submit' variant="contained">Edit User</Button>
                    </Box>

                </Box>
            </form>

            {isLoading && <Loader />}
        </Box>
    )
}

export default UserWindow;