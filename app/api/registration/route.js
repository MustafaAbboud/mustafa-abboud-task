import { hashPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export const POST = async (request) => {

    console.log('handler')
    console.log(request.body)

    const { email, password } = await request.json();

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 4
    ) {
        return new Response("Invalid input - password should also be at least 4 characters long.", { status: 422 });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        client.close();
        return new Response("User exists already!", { status: 422 });
    }

    const hashedPassword = await hashPassword(password);

    const responsresult = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
    });


    client.close();

    return new Response(JSON.stringify({
        email: email,
        password: hashedPassword
    }), { status: 201 })
}
