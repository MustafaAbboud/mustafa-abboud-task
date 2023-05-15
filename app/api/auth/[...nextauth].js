import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../utils/db';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          console.log('ERROR')
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          console.log('ERROR')
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };

      },
    }),
  ],
});
