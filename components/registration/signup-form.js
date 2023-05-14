import { useRef, useState } from 'react';

import classes from './signup-form.module.css';

function SignupForm() {

    const [isChecked, setIsChecked] = useState(false)

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const typeInputRef = useRef();


    async function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
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
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>User Name</label>
                    <input
                        type='text'
                        id='name'
                        required
                        ref={nameInputRef}
                    />
                </div>
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
                <div className={classes.control}>
                    <label htmlFor='type'>Admin</label>
                    <input
                        type='checkbox'
                        id='type'
                        value={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
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
