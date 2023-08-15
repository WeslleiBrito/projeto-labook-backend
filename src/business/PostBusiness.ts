import { InputCreatePostDB, PostDatabase } from "../database/useDatabaseClass/PostDatabase";
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase";
import { InputCreatePostDTO } from "../dtos/createPost.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { IdGenerator } from "../services/IdGenerator";
import { PostDB } from "../types/type";


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ){}


    public createPost = async (input: InputCreatePostDTO) => {

        const {creatorId, content} = input

        const [creatorIdExist] = await this.userDatabase.findUser("id", creatorId)

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
            creator_id: creatorId
        }

        await this.postDatabase.createPost(values)

    }
}