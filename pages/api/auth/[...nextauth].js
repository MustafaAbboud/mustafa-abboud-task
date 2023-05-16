import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();

                const loggedUser = {
                    email: user.email,
                    admin: user.admin
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
});
