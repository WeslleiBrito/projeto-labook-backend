import z from 'zod'

export interface InputDeletePostDTO {
    id: string,
    token: string
}


export const InputDeletePostSchema = z.object(
    {
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id precisa ser uma string."}).min(1, {message: "O id não pode ser vazio."}),
        token: z.string({required_error: "O token é obrigatório."}) 
    }
).transform(data => data as InputDeletePostDTO)