import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { UserDatabase } from "../database/UserDatabase"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase,
        new IdGenerator(),
        new TokenManager()
    )
)

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)