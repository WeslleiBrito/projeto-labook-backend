import express from "express"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { UserBusiness } from "../business/UserBusiness"
import { IdGenerator } from "../services/IdGenerator"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator()
    )
)

userRouter.post('/', userController.createUser)