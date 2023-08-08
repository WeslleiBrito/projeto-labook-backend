import express from "express"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { UserBusiness } from "../business/UserBusiness"

export const userRouter = express.Router()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.post('/', userController.createUser)