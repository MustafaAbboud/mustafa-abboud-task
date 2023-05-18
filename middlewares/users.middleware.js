import jwt from 'jsonwebtoken';

async function authUserMiddleware(req, adminReq) {

    try {

        const token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (adminReq && decoded.role !== 'admin') {
            return false
        }

        return true
    } catch (err) {
        return false
    }
}

export default authUserMiddleware