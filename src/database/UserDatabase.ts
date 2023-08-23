
import { UserDB } from "../types/type";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"

    public signup = async (input: UserDB): Promise<number> => {
        
        const [create] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(input)

        return create
    }

    public findUser = async (colunm?: string, value?: string | number | Array<string | number>): Promise<UserDB[]> => {
        
        if(value && colunm){
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).whereIn(colunm, [value])

            return result
        }

        const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        return result
    
    }
}