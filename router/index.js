import {Router} from 'express'
import userController from '../controller/userControler.js'
import ServiceController from '../controller/serviceController.js'
import AppController from '../controller/appointmentsController.js'
import {notFoundHandling} from "../middleware/notFoundHandling.js";
import {telegramAuthMiddleware} from "../middleware/telegramMiddlewareAuth.js";

const router = Router()

router.get('/appointment', telegramAuthMiddleware, AppController.getAll)
router.get('/appointment/:id', telegramAuthMiddleware, AppController.getOne)
router.post('/appointment', AppController.create)
router.put("/appointment/:id",telegramAuthMiddleware, AppController.update)
router.delete('/appointment/:id', telegramAuthMiddleware, AppController.delete)

router.get('/service', telegramAuthMiddleware, ServiceController.list)
router.get('/service/:id', ServiceController.getOne)
router.post('/service', telegramAuthMiddleware ,ServiceController.createService)
router.put('/service/:id', telegramAuthMiddleware, ServiceController.updateService)
router.delete('/service/:id', telegramAuthMiddleware,ServiceController.deleteService)

router.get('/register', notFoundHandling)
router.post('/register',telegramAuthMiddleware, userController.register)
router.get('/login', notFoundHandling)
router.post('/login', telegramAuthMiddleware, userController.login)

router.delete("/delete-user/:id", telegramAuthMiddleware, userController.deleteUser)
router.get('/get-users', telegramAuthMiddleware, userController.getUsers)
router.get('/get-user/:id', telegramAuthMiddleware, userController.getUser)

router.post('/delete-all', userController.deleteAll)

export {router}