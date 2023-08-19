import z from 'zod'

export interface InputEditPostDTO {
    id: string,
    token: string,
    content: string
} 

export const InputEditPostSchema = z.object(
    {
        content: z.string({required_error: "O content é obrigatório.", invalid_type_error: "O content precisa ser uma string."}).min(1, {message: "O content não pode ser vazio."}),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id precisa ser uma string."}).min(1, {message: "O id não pode ser vazio."}),
        token: z.string({required_error: "O token é obrigatório."})
    }
).transform(data => data as InputEditPostDTO)