import { InputDeletePostDTO } from "../dtos/deletePost.dto";
import { InputEditPostDTO } from "../dtos/editPost.dto";
import { GetPostDB } from "../dtos/getPost.dto";
import { PostDB } from "../types/type";
import { BaseDatabase } from "./BaseDatabase";


export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public createPost = async (input: InputCreatePostDB) => {
        
        await PostDatabase.connection(PostDatabase.TABLE_POSTS).insert(input)
    }

    public getPosts = async (): Promise<GetPostDB[]> => {
        
        const posts: GetPostDB[] = await BaseDatabase.connection("posts").innerJoin("users", "users.id", "posts.creator_id")
        .select(
            "posts.id AS id_post",
            "creator_id",
            "content",
            "likes",
            "dislikes",
            "posts.created_at",
            "update_at",
            "users.name"
        )

        return posts
    }

    public findPost = async (colunm?: string, value?: string | number | Array<string | number>): Promise<PostDB[]> => {
        
        if(value && colunm){
            const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).whereIn(colunm, [value])

            return result
        }

        return await BaseDatabase.connection(PostDatabase.TABLE_POSTS) as PostDB[]
    }

    public editPost = async (input: InputEditPostDTO) => {
        
        const {id, content} = input

        await PostDatabase.connection(PostDatabase.TABLE_POSTS).update({content}).where({id})
    }

    public editLikeDislikePost = async (input: InputEditLikeDislike) => {
        
        const {column, value, id} = input

        if(column === "likes"){
            await PostDatabase.connection(PostDatabase.TABLE_POSTS).update({likes: value}).where({id})
        }else{
            await PostDatabase.connection(PostDatabase.TABLE_POSTS).update({dislikes: value}).where({id})
        }

        
    }
    public deletePost = async (input: InputDeletePostDTO) => {
        const {id} = input

        await PostDatabase.connection(PostDatabase.TABLE_POSTS).del().where({id})
        
    }
    
}


export interface InputCreatePostDB {
    id: string,
    creator_id: string,
    content: string
}

interface InputEditLikeDislike {
    id: string
    column: "likes" | "dislikes" 
    value: number
}
