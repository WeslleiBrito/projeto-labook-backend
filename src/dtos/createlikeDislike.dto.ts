import z from 'zod'

export interface InputLikeDislikeDTO {
    id: string,
    token: string,
    like: boolean
}

export interface OutputLikesDislikesDB {
    user_id: string,
    post_id: string,
    like: LIKE_DISLIKE
}

export enum LIKE_DISLIKE {
    LIKE = 1,
    DISLIKE = 0
}

export const InputLikeDislikeSchema = z.object(
    {
        id: z.string().min(1, {message: "O idPost não pode ser vazio."}),
        token: z.string().min(1, {message: "O token não pode ser vazio."}),
        like: z.boolean({required_error: "O like é obrigatório.", invalid_type_error: "O like deve receber apenas valores boleanos."})
    }
).transform(data => data as InputLikeDislikeDTO)
