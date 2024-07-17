import Appointment from '../models/appointment.js';
import {HttpError} from "../errors/index.js";
import service from "../models/service.js";


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