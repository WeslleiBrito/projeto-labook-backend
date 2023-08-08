import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { createUserInputDTO, createUserOutputDTO } from "../dtos/createUser.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { User } from "../models/User"
import { USER_ROLES } from "../types/type"


export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase
    ){}
    
    public createUser = async (input: createUserInputDTO): Promise<createUserOutputDTO> => {
        
        const {
            id,
            name,
            email,
            password
        } = input

        const [idExist] = await this.userDatabase.findUser('id', id)

        if(idExist){
            throw new ConflictError('O id informado já exite em nossa base de dados!')
        }

        const [emailExist] = await this.userDatabase.findUser('email', email)

        if(emailExist){
            throw new ConflictError('O email informado já exite em nossa base de dados!')
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        await this.userDatabase.createUser(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole(),
                created_at: newUser.getCreatedAt()
            }
        )

        return {token: "um token jwt"}
    }

    
}