import { connectToDB, disconnectFromDB } from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';
import User from '@/models/UsersModel';
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

async function handler(req, res) {

    if (req.method === 'GET') {

        const token = await getToken({ req, secret })

        if (!token) {
            return res.status(498).json({ message: 'Invalid Token!' })
        }

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

        const { _id, name, email, password, role } = await req.body;

        await connectToDB();

        if (_id) {
            //EDIT MODE
            try {
                const token = await getToken({ req, secret })

                if (!token) {
                    return res.status(498).json({ message: 'Invalid Token!' })
                }

                if (token.user.role != 'admin')
                    return res.status(405).json({ message: 'Not Authorized!' })

                const updatedUser = await User.findByIdAndUpdate(_id, {
                    name: name,
                    email: email,
                    role: role
                })

                if (!updatedUser) {
                    res.status(422).json({ message: 'User not found!' });
                    throw new Error('User not found!');
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
                res.status(400).json({ error: error })
                throw new Error(error);
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
                res.status(400).json({ error: error })
                throw new Error(error);
            }
        }
    }

    if (req.method === 'DELETE') {

        const token = await getToken({ req, secret })

        if (!token) {
            return res.status(498).json({ message: 'Invalid Token!' })
        }

        const role = token.user.role

        if (role != 'admin')
            return res.status(405).json({ message: 'Not Authorized!' })

        const { id } = await req.body;

        connectToDB();

        try {

            await User.deleteOne({ _id: id });

            res.status(200).json({ message: 'DELETE SUCCESSFUL!' });
            disconnectFromDB()
        } catch (error) {

            disconnectFromDB()
            res.status(400).json({ error: error })
            throw new Error(error);
        }
    }
}

export default handler;
