import { UserDatabase } from "../database/UserDatabase"
import { inputLoginDTO, outputLoginDTO } from "../dtos/login.dto"
import { createUserInputDTO, createUserOutputDTO } from "../dtos/signup.dto"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { USER_ROLES } from "../types/type"


export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    
    public signup = async (input: createUserInputDTO): Promise<createUserOutputDTO> => {
        
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
        
        const hashPassword = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        await this.userDatabase.signup(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole(),
                created_at: newUser.getCreatedAt()
            }
        )
        
        const token = this.tokenManager.createToken(
            {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            }
        )
        return {token}
    }

    public login = async (input: inputLoginDTO): Promise<outputLoginDTO> => {
        
        const {email, password} = input

        const [userDB] = await this.userDatabase.findUser('email', email)

        if(!userDB){
            throw new NotFoundError('O email informado não existe!')
        }

        const hashedPassword = userDB.password

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if(!isPasswordCorrect){
            throw new UnauthorizedError("Email ou senha inválida.")
        }

        const output = this.tokenManager.createToken(
            {
                id: userDB.id,
                name: userDB.name,
                role: userDB.role
            }
        )
        
        return {
            token: output
        }
    }
    
}