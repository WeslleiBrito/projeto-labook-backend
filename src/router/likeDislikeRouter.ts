import express from "express"
import { LikeDislikeController } from "../controller/LikeDislikeController"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { PostDatabase } from "../database/PostDatabase"


export const likeDislikeRouter = express.Router()

const likeDislikeController = new LikeDislikeController(
    new LikeDislikeBusiness(
        new LikeDislikeDatabase(),
        new TokenManager(),
        new PostDatabase()
    )
)

likeDislikeRouter.post('/:id/like', likeDislikeController.likeDislike)