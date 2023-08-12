import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { UserBusiness } from "../business/UserBusiness";
import { createUserInputDTO, createUserShema } from "../dtos/createUser.dto";
import { ZodError } from "zod";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){}

    public createUser = async (req: Request, res: Response) => {
        try {
            
            const input: createUserInputDTO = createUserShema.parse(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
    
            ) 
            const output = await this.userBusiness.createUser(input)

            res.status(201).json(output)
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