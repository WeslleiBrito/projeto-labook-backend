import { InputCreatePostDB, PostDatabase } from "../database/useDatabaseClass/PostDatabase";
import { UserDatabase } from "../database/useDatabaseClass/UserDatabase";
import { InputCreatePostDTO } from "../dtos/createPost.dto";
import { InputDeletePostDTO } from "../dtos/deletePost.dto";
import { InputEditPostDTO } from "../dtos/editPost.dto";
import { InputGetPostsDTO, OutputGetPost } from "../dtos/getPost.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post } from "../models/Post";
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

    public getPosts = async (input: InputGetPostsDTO): Promise<OutputGetPost[]> => {
        
        const {token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new UnauthorizedError('A conta não tem permissão para vizualizar as postagens!')
        }
        const postsDB = await this.postDatabase.getPosts()

        const posts = postsDB.map(post => {

            const newPost = new Post(
                post.id_post,
                post.creator_id,
                post.content,
                post.likes,
                post.dislikes,
                post.created_at,
                post.update_at
            )

            return {
                id: newPost.getId(),
                content: newPost.getContent(),
                likes: newPost.getLikes(),
                dislikes: newPost.getDislikes(),
                createdAt: newPost.getCreatedAt(),
                updatedAt: newPost.getUpdatedAt(),
                creator: {
                    id: post.creator_id,
                    name: post.name
                }
            }
        })

        return posts
    }

    public editPost = async (input: InputEditPostDTO) => {
        const {token, id} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        const [postExist] = await this.postDatabase.findPost('id', id)
        
        if(!postExist){
            throw new NotFoundError("O id informado não existe.")
        }

        if(!tokenIsValid){
            throw new UnauthorizedError("Token inválido.")
        }

        if(tokenIsValid.id !== postExist.creator_id){
            throw new UnauthorizedError("O usuário não tem permição para editar o poste.")
        }

        await this.postDatabase.editPost(input)

    }
    
    public deletePost = async (input: InputDeletePostDTO) => {
        
        const {id, token} = input

        const tokenIsValid = this.tokenManager.validateToken(token)

        const [postExist] = await this.postDatabase.findPost('id', id)
        
        if(!postExist){
            throw new NotFoundError("O id informado não existe.")
        }

        if(!tokenIsValid){
            throw new UnauthorizedError("Token inválido.")
        }

        if(tokenIsValid.id !== postExist.creator_id){
            throw new UnauthorizedError("O usuário não tem permição para deletar o poste.")
        }

        await this.postDatabase.deletePost(input)
    }
    
}