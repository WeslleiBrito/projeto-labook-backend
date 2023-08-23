import { OutputLikesDislikesDB } from "../../dtos/createlikeDislike.dto";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDislikeDatabase extends BaseDatabase {

    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public createLikeDislike = async (input: InputCreateUpdateLikeDislike) => {

        await LikeDislikeDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).insert({
            post_id: input.postId,
            user_id: input.userId,
            like: input.like
        })
    }

    public findLikeDislike = async (postId: string, userId: string): Promise<OutputLikesDislikesDB> => {

        const [result] = await LikeDislikeDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).where({post_id: postId}).andWhere({user_id: userId})

        return result
    }

    public deleteLikeDislike = async (input: InputdeleteLikeDislikeDB) => {
        
        await LikeDislikeDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).del().where({post_id: input.post_id}).andWhere({user_id: input.user_id})
        
    }

    public updateLikeDislike = async (input: InputCreateUpdateLikeDislike) => {
        
        await LikeDislikeDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).update(
            {like: input.like}
        ).where({post_id: input.postId}).andWhere({user_id: input.userId})

    }
}


export interface InputdeleteLikeDislikeDB {
    post_id: string,
    user_id: string
}

export interface InputCreateUpdateLikeDislike {
    postId: string, 
    userId: string, 
    like: number
}