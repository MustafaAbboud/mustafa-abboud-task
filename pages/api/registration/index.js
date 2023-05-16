import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

async function handler(req, res) {

    if (req.method !== 'POST') {
        return;
    }

    const { name, email, password, admin } = await req.body;

    if (
        !name ||
        !name.trim().length === 0 ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 4
    ) {
        res.status(422).json({ message: 'Invalid input - password should also be at least 4 characters long.' });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const col = db.collection('users')

    const existingUser = await col.findOne({ email: email });

    if (existingUser) {
        client.close();
        res.status(422).json({ message: 'User exists already!' });
    }

    const hashedPassword = await hashPassword(password);

    const lastRecord = await col.findOne({}, { sort: { _id: -1 } });

    const responsresult = await col.insertOne({
        _id: lastRecord._id + 1,
        name: name,
        email: email,
        password: hashedPassword,
        admin: admin
    });

    client.close();

    res.status(200).json({
        result: {
            _id: lastRecord._id + 1,
            name: name,
            email: email,
            admin: admin
        }
    })
}

export default handler;