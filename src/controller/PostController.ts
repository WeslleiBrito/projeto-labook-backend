import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputCreatePostDTO, InputCreatePostSchema } from "../dtos/createPost.dto";


export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ){}
    

    public createPost = async (req: Request, res: Response) => {
        
        try {
            
            const input: InputCreatePostDTO = InputCreatePostSchema.parse(
                {
                    content: req.body.content,
                    creatorId: req.body.creatorId
                }
            )

            await this.postBusiness.createPost(input)

            res.status(201).send("Cadastro efetuado com sucesso!")

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