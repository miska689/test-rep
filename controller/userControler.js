import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import {HttpError} from "../errors/index.js";

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
}

class UserController {
    async register(req, res, next) {
        const {telegram_user_id, telegram_chat_id, username, adminPassword} = req.body;

        if (adminPassword !== process.env.ADMIN_PASS) {
            return next(HttpError.badRequest("HTTP_BAD_REQUEST_ADMIN_PASSWORD_"))
        }

        if (!username || !telegram_user_id || !telegram_chat_id) {
            return next(HttpError.badRequest('HTTP_BAD_REQUEST_ERROR'));
        }

        const candidate = await User.findOne({
            where: {username}
        })

        if (candidate) {
            return next(HttpError.badRequest('HTTP_USER_IS_EXIST_ERROR'))
        }

        const user = await User.create({
            username,
            telegram_user_id,
            telegram_chat_id
        })


        const token = generateToken(user);

        return res.json({
            status: 200,
            message: "Succes",
            isOk: true
        })
    }
    async login(req, res, next) {
        const {telegram_user_id, username} = req.body;

        if (!telegram_user_id) {
            return next(HttpError.badRequest('HTTP_BAD_REQUEST_ERROR'));
        }

        const user = await User.findOne({
            where: {username}
        })

        const compareUserId = telegram_user_id === user?.telegram_user_id

        if (!compareUserId || !user) {
            return next(HttpError.badRequest('WRONG_USER'));
        }

        return res.json({
            status: 200,
            message: "Succes",
            isOk: true
        })
    }

    async deleteUser(req, res, next) {
        const {id} = req.params

        const {adminPassword} = req.body

        if (adminPassword !== process.env.ADMIN_PASS) {
            return next(HttpError.badRequest("HTTP_BAD_REQUEST_ADMIN_PASSWORD_"))
        }

        if (!id){
            return next(HttpError.badRequest("ID_IS_REQUIRED"))
        }

        const user = await User.destroy({
            where: {id}
        })

        return res.json({
            user
        })
    }

    async getUsers(req, res, next) {
        const users = await User.findAll()

        return res.json({
            users
        })
    }

    async getUser(req, res, next) {
        const {id} = req.params

        if (!id) {
            return next(HttpError.badRequest('ID_IS_REQUIRED'))
        }

        const user = await User.findOne({
            where: {id}
        })

        return res.json({
            user
        })
    }

    async deleteAll(req, res) {
        const {pass} = req.body;

        if (pass !== 'alorap6789'){
            return res.json({
                message: "Nu a mers!"
            })
        }

        const deleteTabel = await User.truncate()

        return res.json({
            message: "Sa sters tabelul"
        })
    }
}

export default new UserController();