import {Router} from 'express'
import userController from '../controller/userControler.js'
import {authMiddleware} from "../middleware/authMiddleware.js";
import ServiceController from '../controller/serviceController.js'
import AppController from '../controller/appointmentsController.js'
import {notFoundHandling} from "../middleware/notFoundHandling.js";

const router = Router()

router.get('/appointment', authMiddleware, AppController.getAll)
router.get('/appointment/:id', authMiddleware, AppController.getOne)
router.post('/appointment', AppController.create)
router.put("/appointment/:id",authMiddleware, AppController.update)
router.delete('/appointment/:id', authMiddleware, AppController.delete)

router.get('/service', ServiceController.list)
router.get('/service/:id', ServiceController.getOne)
router.post('/service', authMiddleware ,ServiceController.createService)
router.put('/service/:id', authMiddleware, ServiceController.updateService)
router.delete('/service/:id', authMiddleware,ServiceController.deleteService)

router.get('/register', notFoundHandling)
router.post('/register', userController.register)
router.get('/login', notFoundHandling)
router.post('/login', userController.login)


router.get('/auth', authMiddleware, userController.auth)
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser)
router.get('/get-users', authMiddleware, userController.getUsers)
router.get('/get-user/:id', authMiddleware, userController.getUser)

export {router}