import { LikeDislikeDatabase } from "../database/useDatabaseClass/LikeDislikeDatabase";
import { PostDatabase } from "../database/useDatabaseClass/PostDatabase";
import { InputLikeDislikeDTO } from "../dtos/createlikeDislike.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenManager } from "../services/TokenManager";

export class LikeDislikeBusiness {

    constructor (
        private likeDislikeDatabase: LikeDislikeDatabase,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase
    ){} 

    public likeDislike = async (input: InputLikeDislikeDTO) => {
        
        const {id, like, token} = input

        const [postExist] = await this.postDatabase.findPost("id", id)

        if(!postExist){
            throw new NotFoundError("O post não encontrado!")
        }

        const tokenIsValid = this.tokenManager.validateToken(token)

        if(!tokenIsValid){
            throw new UnauthorizedError("Você não possui as credencias para interagir na postagem.")
        }

        if(postExist.creator_id === tokenIsValid.id){
            throw new ConflictError("Você é o criador da postagem, por tanto, não pode dar like ou dislike.")
        }

        const userId = tokenIsValid.id

        const likeDislikeExist = await this.likeDislikeDatabase.findLikeDislike(id, userId)

        if(!likeDislikeExist){

            await this.likeDislikeDatabase.createLikeDislike({postId: id, userId, like: like ? 1 : 0})

        }else{

            const newLike = like ? 1 : 0

            if(newLike === likeDislikeExist.like){

                await this.likeDislikeDatabase.deleteLikeDislike({post_id: likeDislikeExist.post_id, user_id: tokenIsValid.id})

            }else{

                await this.likeDislikeDatabase.updateLikeDislike({postId: likeDislikeExist.post_id, userId: likeDislikeExist.user_id, like: likeDislikeExist.like === 1 ? 0 : 1})
            }

        }
        
    }
}