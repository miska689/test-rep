import Appointment from '../models/appointment.js';
import {HttpError} from "../errors/index.js";
import service from "../models/service.js";
import {bot} from "../tel-bot-service/index.js"
import User from "../models/user.js";

class AppointmentsController {
    async getOne(req, res, next) {
        const {id} = req.params;

        if(!id) {
            return next(HttpError.badRequest('ID_IS_REQUIRED'));
        }

        const appointment = await Appointment.findOne({
            where: {id}
        })

        if(!appointment){
            return next(HttpError.badRequest('APPOINTMENT_NOT_EXIST'));
        }

        return res.json({
            appointment
        })
    }

    async getAll(req, res, next) {
        const appointments = await Appointment.findAll()

        return res.json({
            appointments
        })
    }

    async create(req, res, next) {
        const {email, phone, date, serviceId} = req.body;

        if(!email || !phone || !date || !serviceId){
            return next(HttpError.badRequest('BAD_REQUEST_ERROR'));
        }

        const appointment = await Appointment.create({
            email,
            phone,
            date,
            serviceId
        })

        const users = await User.findAll()

        for await (let user of users){
            await bot.sendMessage(user?.dataValues?.telegram_chat_id,
                "🎉 Înregistrare reușită! 🎉\n" +
                "\n" +
                "📋 Detalii înregistrare:\n" +
                "\n" +
                `📧 Email: ${appointment.email}\n` +
                `📱 Număr de telefon: ${appointment.phone}\n` +
                `📅 Data înregistrării: ${appointment.date}\n`
            )
        }

        return res.json({
            appointment
        })
    }

    async update(req, res, next) {
        const {id} = req.params;


        if(!id){
            return next(HttpError.badRequest('ID_IS_REQUIRED'));
        }

        const appointment = await Appointment.findOne({
            where: {id}
        })

        if (!appointment) {
            return next(HttpError.badRequest('APPOINTMENT_NOT_EXIST'));
        }

        const {email, phone, date, serviceId} = req.body;

        if (email){
            appointment.email = email
        }

        if (phone){
            appointment.phone = phone
        }

        if(date) {
            appointment.date = date
        }

        if(serviceId) {
            service.name = serviceId
        }

        appointment.save()

        return res.json({
            appointment
        })
    }

    async delete(req, res, next) {
        const {id} = req.params;

        if (!id){
            return next(HttpError.badRequest('ID_IS_REQUIRED'));
        }

        const appointment = await Appointment.destroy({
            where: {id}
        })

        return res.json({
            appointment
        })
    }
}

export default new AppointmentsController();