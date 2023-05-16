import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Loader from '@/utils/loader';

function SignupForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [isChecked, setIsChecked] = useState(true)
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
                toast.error(result.error);
            }

            setIsLoading(false)
        } else {

            const enteredName = nameInputRef.current.value;
            const admin = isChecked;

            const user = {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                admin: admin,
            }

            try {
                const result = await createUser(user);
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false)
        }
    }

    async function createUser(user) {

        const response = await fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error('Something went wrong!');
            throw new Error(data.message || 'Something went wrong!');
        }

        toast.success('Signup Successful');
        return data;
    }

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                    <Input sx={{ marginTop: '20px' }} id="standard-basic" placeholder="Email" required inputRef={emailInputRef} />

                    <Input sx={{ marginTop: '20px' }} id="standard-basic" type='password' placeholder="Password" required inputRef={passwordInputRef} />

                    {!isLogin &&
                        <FormControlLabel sx={{ marginTop: '20px' }} control={<Checkbox checked={isChecked} />} label="Admin" onChange={() => setIsChecked(!isChecked)} />
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
