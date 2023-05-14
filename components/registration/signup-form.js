import { useRef } from 'react';

import classes from './signup-form.module.css';

function SignupForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        try {
            const result = await createUser(enteredEmail, enteredPassword);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function createUser(email, password) {

        const response = await fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
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
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </section>
    );
}

export default SignupForm;
