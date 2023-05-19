import jwt from 'jsonwebtoken';

//middleware to chech if user is authorized to make an api call or not 
//using jwt token sent in the request header
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