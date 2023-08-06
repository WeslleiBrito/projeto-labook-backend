import { UserDatabase } from "../database/useDatabaseClass/UserDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { User } from "../models/User"
import { USER_ROLES } from "../types/type"


export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase = new UserDatabase()
    ){}
    
    public createUser = async (input: any) => {
        
        const {
            id,
            name,
            email,
            password
        } = input

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|[a-zA-Z]{2})$/
        const regexLetter = /[a-zA-Z]/
        const regexNumber = /(?=.*\d)/
        const regexSpecialCharacter = /[!#$%&@§*=+|]/

        Object.entries({id, name, email, password}).forEach((property) => {
            const [key, value] = property

            if(typeof(value) !== "string"){
                throw new BadRequestError(`Era esperado que a propriedade '${key}' fosse uma string, porém o valor recebido foi do tipo '${typeof value}.'`)
            }else if(value.length === 0){
                throw new UnprocessableEntityError(`A propriedade '${key}' não pode ser vazia.`)
            }
        })

        if(!regexEmail.test(email)){
            throw new UnprocessableEntityError(`O email informado é inválido.`)
        }

        if(!regexLetter.test(password)){
            throw new BadRequestError(`Sua senha precisa ter pelo menos uma letra.'`)
        }
        if(!regexNumber.test(password)){
            throw new BadRequestError(`Sua senha precisa ter pelo menos um número.'`)
        }
        if(!regexSpecialCharacter.test(password)){
            throw new BadRequestError(`Sua senha precisa ter pelo menos um desse caracteres especiais: { '!', '#', '$', '%', '&', '@', '§', '*', '=', '+', '|' }.`)
        }

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
    }
}