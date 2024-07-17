import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    
    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next()
    } catch (e) {
        res.status(401).send({
            message: "USER_NOT_AUTH"
        })
    }
}