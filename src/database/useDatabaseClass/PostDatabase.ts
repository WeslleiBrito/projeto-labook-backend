
import { GetPostDB } from "../../dtos/getPost.dto";
import { PostDB } from "../../types/type";
import { DatabaseConnection } from "./DatabaseConnection";


export class PostDatabase extends DatabaseConnection{
    public static TABLE_POSTS = "posts"

    public createPost = async (input: InputCreatePostDB) => {
        
        await PostDatabase.connection(PostDatabase.TABLE_POSTS).insert(input)
    }

    public getPosts = async (): Promise<GetPostDB[]> => {
        
        const posts: GetPostDB[] = await DatabaseConnection.connection("posts").innerJoin("users", "users.id", "posts.creator_id")
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
            const result: PostDB[] = await DatabaseConnection.connection(PostDatabase.TABLE_POSTS).whereIn(colunm, [value])

            return result
        }

        return await DatabaseConnection.connection(PostDatabase.TABLE_POSTS) as PostDB[]
    }
}


export interface InputCreatePostDB {
    id: string,
    creator_id: string,
    content: string
}