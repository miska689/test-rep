import {HttpError} from "../errors/index.js"
import Service from '../models/service.js'

class ServiceController {
    async createService(req, res, next) {
        const {name, describe, price} = req.body;

        if(!name || !describe || !price) {
            return next(HttpError.badRequest("HTTP_BAD_REQUEST"))
        }

        const candidate = await Service.findOne({
            where: {name}
        })

        if (candidate) {
            return next(HttpError.badRequest("SERVICE_ALREADY_EXIST"))
        }

        const service = await Service.create({
            name,
            describe,
            price
        })

        return res.json({
            message: 'Service created successfully',
            service
        })
    }

    async updateService(req, res, next) {
        const {id} = req.params;

        const service = await Service.findOne({
            where: {id}
        })

        if(!service){
            return next(HttpError.badRequest('SERVICE_NOT_EXIST'))
        }

        const {name, describe, price} = req.body;

        if(name !== null && name !== undefined) {
            service.name = name
        }

        if (describe !== null && describe !== undefined) {
            service.describe = describe
        }

        if(price !== null && price !== undefined) {
            service.price = price
        }

        service.save()

        return res.json({
            service
        })
    }

    async deleteService(req, res, next) {
        const {id} = req.params

        if (!id){
            return next(HttpError.badRequest('SERVICE_NOT_EXIST'))
        }

        const service = await Service.destroy({
            where: {id}
        })

        return res.json({
            service
        })
    }

    async list(req, res) {
        const services = await Service.findAll()

        return res.json({
            services
        })
    }

    async getOne(req, res, next) {
        const {id} = req.params

        if (!id) {
            return next(HttpError.badRequest('ID_IS_REQUIRED'))
        }

        const service = await Service.findOne({
            where: {id}
        })

        if(!service){
            return next(HttpError.badRequest('SERVICE_NOT_EXIST'))
        }

        return res.json({
            service
        })
    }
}

export default new ServiceController();