import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

// import classes from './signup-form.module.css';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function SignupForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [isChecked, setIsChecked] = useState(false)

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        console.log(enteredEmail)
        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            console.log(result)

            if (!result.error) {
                // set some auth state
                // router.replace('/profile');
                console.log(result)
            }
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
        }
    }

    async function createUser(user) {

        console.log(user)

        const response = await fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    return (
        // <Box
        //     component="form"
        //     sx={{
        //         '& > :not(style)': { m: 1, width: '25ch' },
        //     }}
        //     noValidate
        //     autoComplete="off"
        // >
        //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        //     <TextField id="filled-basic" label="Filled" variant="filled" />
        //     <TextField id="standard-basic" label="Standard" variant="standard" />
        // </Box>
        <form onSubmit={submitHandler} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', paddingTop: '40px' }}>
                {!isLogin &&
                    <Input id="standard-basic" placeholder="User Name" required inputRef={nameInputRef} />
                }

                <Input sx={{ marginTop: '20px' }} id="standard-basic" placeholder="Email" required inputRef={emailInputRef} />

                <Input sx={{ marginTop: '20px' }} id="standard-basic" type='password' placeholder="Password" required inputRef={passwordInputRef} />

                {!isLogin &&
                    <FormControlLabel sx={{ marginTop: '20px' }} control={<Checkbox defaultChecked on />} label="Admin" onChange={() => setIsChecked(!isChecked)} />
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
    );
}

export default SignupForm;
