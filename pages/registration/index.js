'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import SignupForm from '../../components/registration/signup-form';

function RegistrationPage() {

    const { data: session, status } = useSession()

    const loading = status === "loading"

    const router = useRouter();

    useEffect(() => {

        if (session) {
            if (session.user.role === 'admin')
                router.replace('/admin');
            else
                router.replace('/');
        }
    }, [session])

    if (loading) {
        return <p>Loading ...</p>
    }

    return <SignupForm />;
}

export default RegistrationPage;
