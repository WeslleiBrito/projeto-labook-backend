import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/useDatabaseClass/PostDatabase"
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"

export const postRouter = express.Router()

const postController = new PostController(new PostBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new IdGenerator()
))


postRouter.post('/', postController.createPost)