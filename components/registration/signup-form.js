import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Loader from '@/utils/loader';

function SignupForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('subscriber')
    const [isLoading, setIsLoading] = useState(false)

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        setIsLoading(true)

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {

            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            if (!result.ok) {
                toast.error('Something went wrong!');
            }

            setIsLoading(false)
        } else {

            const enteredName = nameInputRef.current.value;

            const user = {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                role: role,
            }

            try {
                const result = await createUser(user);

                if (result.error)
                    toast.error(result.error);
                else {
                    toast.success('Signup Successful');
                    setIsLogin(true)
                }

            } catch (error) {
                toast.error('Something went wrong!');
            }

            setIsLoading(false)
        }
    }

    async function createUser(user) {

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    }

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
                pauseOnHover={false}
            />
            <form onSubmit={submitHandler}>
                <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', paddingTop: '40px' }}>
                    {!isLogin &&
                        <Input id="standard-basic" placeholder="User Name" required inputRef={nameInputRef} />
                    }

                    <Input sx={{ marginTop: '20px' }} id="standard-basic" type='email' placeholder="Email" required inputRef={emailInputRef} />

                    <Input sx={{ marginTop: '20px' }} id="standard-basic" type='password' placeholder="Password" required inputRef={passwordInputRef} />

                    {!isLogin &&
                        <Select
                            sx={{ marginTop: '20px' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'subscriber'}>Subscriber</MenuItem>
                        </Select>
                    }

                    {isLogin &&
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="text">Forgot your password ?</Button>
                        </Box>
                    }

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
                        <Button sx={{ width: '100px' }} type='submit' variant="contained">{isLogin ? 'Login' : 'Sign Up'}</Button>
                        <Button
                            variant="text"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Create new account' : 'Login with existing account'}
                        </Button>
                    </Box>
                </Box>
            </form>

            {isLoading && <Loader />}
        </Box>
    );
}

export default SignupForm;
