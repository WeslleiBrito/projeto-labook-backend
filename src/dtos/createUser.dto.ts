import z from 'zod'

export interface createUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface createUserOutputDTO {
    token: string
}

const regexLetter = /[a-zA-Z]/
const regexNumber = /(?=.*\d)/
const regexSpecialCharacter = /[!#$%&@§*=+|]/

export const createUserShema = z.object(
    {
        id: z.string(
            {
                required_error: "O 'id' é obrigatório.",
                invalid_type_error: "O tipo informado é inválido, era esperado que o 'id' fosse uma string."
            }
        )
        .min(4, {message: "O 'id' precisa ter pelo menos 4 caracteres."})
        .max(4, {message: "O 'id' não pode ter mais que 4 caracteres."}),

        name: z.string(
            {
                required_error: "O 'name' é obrigatório.",
                invalid_type_error: "O tipo informado é inválido, era esperado que o 'name' fosse uma string."
            }
        ).min(3, {message: "O 'name' precisa ter pelo menos 3 caracteres."}),
        
        email: z.string(
            {
                required_error: "O 'email' é obrigatório.",
                invalid_type_error: "O tipo informado é inválido, era esperado que o 'name' fosse uma string."
            }
        ).email({message: "O 'email' informado é inválido."}), 
        password: z.string(
            {
                required_error: "O 'password' é obrigatório.",
                invalid_type_error: "O tipo informado é inválido, era esperado que o 'password' fosse uma string."
            }
        ).min(6, "O 'password' precisa ter pelo menos 6 caracteres.")
        .regex(regexLetter, {message: "Sua senha precisa ter pelo menos uma letra."})
        .regex(regexNumber, {message: "Sua senha precisa ter pelo menos um número."})
        .regex(regexSpecialCharacter, {message: "Sua senha precisa ter pelo menos um desse caracteres especiais: { '!', '#', '$', '%', '&', '@', '§', '*', '=', '+', '|' }."})
    }
).transform(data => data as createUserInputDTO)