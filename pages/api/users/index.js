import { connectToDB, disconnectFromDB } from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';
import User from '@/models/UsersModel';

async function handler(req, res) {

    if (req.method === 'GET') {

        try {

            await connectToDB();

            const responsResult = await User.find({})

            res.status(200).json({ result: responsResult });

            disconnectFromDB()
        } catch (error) {

            disconnectFromDB()
            res.status(400).json({ message: error })
        }
    }

    if (req.method === 'POST') {

        const { _id, name, email, password, admin } = await req.body;

        await connectToDB();

        if (_id) {
            //EDIT MODE
            try {


                await User.findByIdAndUpdate(_id, {
                    name: name,
                    email: email,
                    admin: admin
                })

                // if (!existingUser) {
                //     client.close();
                //     res.status(422).json({ message: 'User not found!' });
                //     return
                // }

                // await user.save()

                res.status(200).json({
                    _id: _id,
                    name: name,
                    email: email,
                    admin: admin
                })

                disconnectFromDB()
            } catch (error) {

                disconnectFromDB()
                res.status(400).json({ error: error })
            }
        } else {
            //NEW MODE  
            try {

                const lastRecord = await User.findOne().sort({ field: 'asc', _id: -1 })

                var user = new User({
                    _id: lastRecord._id + 1,
                    name: name,
                    email: email,
                    password: await hashPassword(password),
                    admin: admin
                })

                await user.save()

                res.status(200).json({
                    _id: lastRecord._id + 1,
                    name: name,
                    email: email,
                    admin: admin
                })

                disconnectFromDB()
            } catch (error) {

                disconnectFromDB()
                res.status(400).json({ error: error })
            }
        }
    }

    if (req.method === 'DELETE') {

        const { id } = await req.body;

        connectToDB();

        await User.deleteOne({ _id: id });

        res.status(200).json({ message: 'DELETE SUCCESSFUL!' });
        disconnectFromDB()
    }
}

export default handler;
