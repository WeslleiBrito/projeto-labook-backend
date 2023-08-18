import { InputCreatePostDB, PostDatabase } from "../database/useDatabaseClass/PostDatabase";
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase";
import { InputCreatePostDTO } from "../dtos/createPost.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}


    public createPost = async (input: InputCreatePostDTO) => {

        const {token, content} = input

        const userAuthorized = this.tokenManager.validateToken(token)

        if(!userAuthorized){
            throw new UnauthorizedError('A conta não tem permissão para fazer postagem!')
        }

        const [creatorIdExist] = await this.userDatabase.findUser("id", userAuthorized.id)

        if(!creatorIdExist){
            throw new NotFoundError('O id do criador não existe')
        }

        let id = this.idGenerator.generate()

       while(!await this.postDatabase.findPost('id', id)){
            id = this.idGenerator.generate()
        }

        const values: InputCreatePostDB = {
            id,
            content,
            creator_id: userAuthorized.id
        }

        await this.postDatabase.createPost(values)

    }
}