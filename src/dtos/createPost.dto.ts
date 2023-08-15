import z from 'zod'

export interface InputCreatePostDTO {
    content: string,
    creatorId: string
}

export interface OutputPostDTO {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string
}

export const InputCreatePostSchema = z.object(
    {
        content: z.string({required_error: "Para a criação do post é necessário o conteúdo", invalid_type_error: "O post deve ser do tipo string."}).min(1, {message: "O conteúdo da postagem não pode ser vazio."}),
        creatorId: z.string({required_error: "O id do criador da postagem é obrigatório.", invalid_type_error: "O id do criador da postagem deve ser do tipo string."}).min(36, {message: "O id informado é inválido, pois o mesmo precisa ter 36 caracters."}).max(36, {message: "O id informado é inválido, pois o mesmo precisa ter no máximo 36 caracters."})
    }
).transform(data => data as InputCreatePostDTO)