import z from 'zod'

export interface inputLoginDTO {
    email: string,
    password: string
}


export interface outputLoginDTO {
    token: string
}


export const inputLoginSchema = z.object(
    {
        email: z.string({required_error: "O email é obrigatório.", invalid_type_error: "O email precisa ser do tipo string."})
        .email({message: "Email inválido."}),
        password: z.string({required_error: "O password é obrigatório.", invalid_type_error: "O password precisa ser do tipo string."})
    }
).transform(data => data as inputLoginDTO)
