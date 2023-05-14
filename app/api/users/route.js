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
