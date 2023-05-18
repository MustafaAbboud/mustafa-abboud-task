import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

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

                const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '30d'
                });

                disconnectFromDB()

                const loggedUser = {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                    accessToken: accessToken
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
