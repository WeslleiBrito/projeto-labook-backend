import z from 'zod'

export interface createUserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface createUserOutputDTO {
    token: string
}


export const createUserShema = z.object(
    {
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
        )
    }
).transform(data => data as createUserInputDTO)