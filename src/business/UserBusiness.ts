import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { createUserInputDTO, createUserOutputDTO } from "../dtos/createUser.dto"
import { ConflictError } from "../errors/ConflictError"
import { User } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { USER_ROLES } from "../types/type"


export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ){}
    
    public createUser = async (input: createUserInputDTO): Promise<createUserOutputDTO> => {
        
        const {
            name,
            email,
            password
        } = input

        const [emailExist] = await this.userDatabase.findUser('email', email)

        if(emailExist){
            throw new ConflictError('O email informado já exite em nossa base de dados!')
        }

        const id = this.idGenerator.generate()
        
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