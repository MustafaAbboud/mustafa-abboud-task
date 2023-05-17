import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from '../../../utils/auth';
import { connectToDB, disconnectFromDB } from '../../../utils/db';
import User from '@/models/UsersModel';

export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                await connectToDB();

                const user = await User.findOne({ email: credentials.email }).select('+password');

                if (!user) {
                    disconnectFromDB()
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    disconnectFromDB()
                    throw new Error('Could not log you in!');
                }

                disconnectFromDB()

                const loggedUser = {
                    email: user.email,
                    role: user.role
                }

                return loggedUser;
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
