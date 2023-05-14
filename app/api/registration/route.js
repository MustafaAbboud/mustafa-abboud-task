import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export const POST = async (request) => {

    const { name, email, password, admin } = await request.json();

    if (
        !name ||
        !name.trim().length === 0 ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 4
    ) {
        return new Response(JSON.stringify("Invalid input - password should also be at least 4 characters long."), { status: 422 });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const col = db.collection('users')

    const existingUser = await col.findOne({ email: email });

    if (existingUser) {
        client.close();
        return new Response("User exists already!", { status: 422 });
    }

    const hashedPassword = await hashPassword(password);

    const _id = await col.countDocuments({}, { hint: "_id_" })

    const responsresult = await col.insertOne({
        _id: _id + 1,
        name: name,
        email: email,
        password: hashedPassword,
        admin: admin
    });


    client.close();

    return new Response(JSON.stringify({
        _id: _id + 1,
        name: name,
        email: email,
        admin: admin
    }), { status: 201 })
}
