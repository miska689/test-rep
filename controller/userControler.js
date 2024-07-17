import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import {HttpError} from "../errors/index.js";
import req from "express/lib/request.js";

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
}

class UserController {
    async register(req, res, next) {
        const {username, password, adminPassword} = req.body;

        if (adminPassword !== process.env.ADMIN_PASS) {
            return next(HttpError.badRequest("HTTP_BAD_REQUEST_ADMIN_PASSWORD_"))
        }

        if (!username || !password) {
            return next(HttpError.badRequest('HTTP_BAD_REQUEST_ERROR'));
        }

        const candidate = await User.findOne({
            where: {username}
        })

        if (candidate) {
            return next(HttpError.badRequest('HTTP_USER_IS_EXIST_ERROR'))
        }

        const hashPassword = await bcrypt.hash(password, 4)

        const user = await User.create({
            username,
            password: hashPassword
        })


        const token = generateToken(user);

        return res.json({ token });
    }

    async login(req, res, next) {
        const {username, password} = req.body;

        if (!username || !password) {
            return next(HttpError.badRequest('HTTP_BAD_REQUEST_ERROR'));
        }

        const user = await User.findOne({
            where: {username}
        })

        const comparePass = await bcrypt.compareSync(password, user.password)

        if (!comparePass || !user) {
            return next(HttpError.badRequest('WRONG_USER_PASSWORD'));
        }

        const token = generateToken(user);

        return res.json({ token });
    }

    async auth(req, res, next) {
        const token = generateToken(req.user)

        return res.json({
            token
        })
    }

    async deleteUser() {
        const {id} = req.params

        if (!id){

        }
    }
}

export default new UserController();