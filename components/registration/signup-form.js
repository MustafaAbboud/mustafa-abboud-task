import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

import classes from './signup-form.module.css';

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

        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });

            if (!result.error) {
                // set some auth state
                // router.replace('/profile');
                console.log(result)
                alert('Login Successful')
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
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin &&
                    <div className={classes.control}>
                        <label htmlFor='name'>User Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            ref={nameInputRef}
                        />
                    </div>
                }
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email'
                        id='email'
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                {!isLogin &&
                    <div className={classes.control}>
                        <label htmlFor='type'>Admin</label>
                        <input
                            type='checkbox'
                            id='type'
                            value={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                    </div>
                }
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Sign Up'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default SignupForm;
