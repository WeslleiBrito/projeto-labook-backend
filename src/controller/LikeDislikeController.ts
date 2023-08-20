import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";
import { InputLikeDislikeSchema } from "../dtos/createlikeDislike.dto";


export class LikeDislikeController {

    constructor(
        private likeDislikeBusiness: LikeDislikeBusiness
    ){}

    public likeDislike = async (req: Request, res: Response) => {
        
        try {
            const input = InputLikeDislikeSchema.parse(
                {
                    id: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                }
            )

            const output = await this.likeDislikeBusiness.likeDislike(input)

            res.status(201).send(input.like ? "Like" : "Dislike")

        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}