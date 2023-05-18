import { connectToDB, disconnectFromDB } from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';
import User from '@/models/UsersModel';
import authUserMiddleware from '@/middlewares/users.middleware';

async function handler(req, res) {

    if (req.method === 'GET') {

        const isValid = await authUserMiddleware(req, false)

        if (!isValid)
            return res.status(401).json({ error: 'Invalid Token!' })

        try {

            await connectToDB();

            const responsResult = await User.find({})

            res.status(200).json({ result: responsResult });

            disconnectFromDB()
        } catch (error) {

            disconnectFromDB()
            res.status(400).json({ error: 'Something went wrong!' })
        }
    }

    if (req.method === 'POST') {

        const { _id, name, email, password, role } = await req.body;

        await connectToDB();

        if (_id) {
            //EDIT MODE
            try {
                const isValid = await authUserMiddleware(req, true)

                if (!isValid)
                    return res.status(401).json({ error: 'Invalid Token!' })

                const updatedUser = await User.findByIdAndUpdate(_id, {
                    name: name,
                    email: email,
                    role: role
                })

                if (!updatedUser) {
                    return res.status(422).json({ error: 'User not found!' });
                }

                res.status(200).json({
                    _id: _id,
                    name: name,
                    email: email,
                    role: role
                })

                disconnectFromDB()
            } catch (error) {

                disconnectFromDB()
                res.status(400).json({ error: 'Something went wrong!' })
            }
        } else {
            //NEW MODE  
            try {

                const lastRecord = await User.findOne().sort({ field: 'asc', _id: -1 })

                let newUserId
                if (lastRecord)
                    newUserId = lastRecord._id + 1
                else
                    newUserId = 1

                var user = new User({
                    _id: newUserId,
                    name: name,
                    email: email,
                    password: await hashPassword(password),
                    role: role
                })

                await user.save()

                res.status(200).json({
                    _id: newUserId,
                    name: name,
                    email: email,
                    role: role
                })

                disconnectFromDB()
            } catch (error) {

                disconnectFromDB()
                res.status(400).json({ error: 'Something went wrong!' })
            }
        }
    }

    if (req.method === 'DELETE') {

        const isValid = await authUserMiddleware(req, true)

        if (!isValid)
            return res.status(401).json({ error: 'Invalid Token!' })

        const { id } = await req.body;

        await connectToDB();

        try {

            await User.deleteOne({ _id: id });

            res.status(200).json({ message: 'DELETE SUCCESSFUL!' });
            disconnectFromDB()
        } catch (error) {

            disconnectFromDB()
            res.status(400).json({ error: 'Something went wrong!' })
        }
    }
}

export default handler;
