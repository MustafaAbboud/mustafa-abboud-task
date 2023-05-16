import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export const GET = async () => {

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

    return new Response(JSON.stringify(responsResult), { status: 200 })
}

export const POST = async (request) => {

    console.log(request.method)
}

export const PATCH = async (request) => {

    const { id, name, email, password, admin } = await request.json();

    if (
        !id ||
        !name ||
        !name.trim().length === 0 ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 4
    ) {
        return new Response(JSON.stringify("Invalid input - password should also be at least 4 characters long."));
    }

    const client = await connectToDatabase();

    const db = client.db();

    const col = db.collection('users')

    const existingUser = await col.findOne({ _id: id });

    if (!existingUser) {
        client.close();
        return new Response("User not found!");
    }

    const hashedPassword = await hashPassword(password);

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

    return new Response(JSON.stringify({
        _id: id,
        name: name,
        email: email,
        admin: admin
    }))
}

export const DELETE = async (request) => {

    const { id } = await request.json();

    const client = await connectToDatabase();

    const db = client.db();

    const col = db.collection('users')

    const existingUser = await col.findOne({ _id: id });

    if (!existingUser) {
        client.close();
        return new Response("User not found!");
    }

    const result = await col.deleteOne({ _id: id },);

    client.close();

    return new Response(JSON.stringify({ message: 'DELETE SUCCESS' }))
}
