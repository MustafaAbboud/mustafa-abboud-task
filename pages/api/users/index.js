import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

async function handler(req, res) {

    if (req.method === 'GET') {

        const client = await connectToDatabase();
        const db = client.db();

        const col = await db.collection('users')

        const responsResult = await col.find({}, '-password').toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });

        client.close();

        res.status(200).json({ result: responsResult });
    }

    if (req.method === 'PATCH') {

        const { id, name, email, admin } = await req.body;

        if (
            !id ||
            !name ||
            !name.trim().length === 0 ||
            !email ||
            !email.includes('@')
        ) {
            res.status(422).json({ message: 'Invalid input - password should also be at least 4 characters long.' });
        }

        const client = await connectToDatabase();

        const db = client.db();

        const col = db.collection('users')

        const existingUser = await col.findOne({ _id: id });

        if (!existingUser) {
            client.close();
            res.status(422).json({ message: 'User not found!' });
        }

        const hashedPassword = await hashPassword(existingUser.password);

        const result = await col.updateOne(
            { _id: id },
            {
                $set: {
                    _id: id,
                    name: name,
                    email: email,
                    password: hashedPassword,
                    admin: admin
                }
            }
        );

        client.close();

        res.status(200).json({
            result: {
                _id: id,
                name: name,
                email: email,
                admin: admin
            }
        })
    }

    if (req.method === 'DELETE') {

        const { id } = await req.body;

        const client = await connectToDatabase();

        const db = client.db();

        const col = db.collection('users')

        const existingUser = await col.findOne({ _id: id });

        if (!existingUser) {
            client.close();
            res.status(422).json({ message: 'User not found!' });
        }

        const result = await col.deleteOne({ _id: id },);

        client.close();

        res.status(200).json({ message: 'DELETE SUCCESSFUL!' });
    }
}

export default handler;
