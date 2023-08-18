import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputCreatePostDTO, InputCreatePostSchema } from "../dtos/createPost.dto";
import { InputGetPostSchema, InputGetPostsDTO, OutputGetPost } from "../dtos/getPost.dto";


export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ){}
    

    public createPost = async (req: Request, res: Response) => {
        
        try {

            const input: InputCreatePostDTO = InputCreatePostSchema.parse(
                {
                    content: req.body.content,
                    token: req.headers.authorization
                }
            )

            await this.postBusiness.createPost(input)

            res.status(201).send({message: "Create Post"})

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

    public getPosts = async (req: Request, res: Response) => {
        
        try {

            const input: InputGetPostsDTO = InputGetPostSchema.parse(
                {
                    token: req.headers.authorization
                }
            )

            const post: OutputGetPost[] = await this.postBusiness.getPosts(input)

            res.status(201).send(post)

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