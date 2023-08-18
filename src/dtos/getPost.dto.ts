import z from 'zod'

export interface InputGetPostsDTO {
    token: string
}

export interface OutputGetPost {
    id: string
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface GetPostDB {
    id_post: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string
    name: string
}


export const InputGetPostSchema = z.object(
    {
        token: z.string({required_error: "Para pegar as postagens é preciso informar o token."})
    }
).transform(data => data as InputGetPostsDTO)