import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {

    constructor(
        private userBusiness: UserBusiness = new UserBusiness()
    ){}

    public createUser = async (req: Request, res: Response) => {
        try {
            
            const input: any = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            await this.userBusiness.createUser(input)

            res.status(201).json(
                {
                    token: "um token jwt"
                }
            )
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}