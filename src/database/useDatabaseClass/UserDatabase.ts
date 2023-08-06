import { UserDB } from "../../types/type";
import { DatabaseConnection } from "./DatabaseConnection";


export class UserDatabase extends DatabaseConnection{

    public static TABLE_USERS = "users"

    public createUser = async (input: UserDB): Promise<number> => {
        
        const [create] = await DatabaseConnection.connection(UserDatabase.TABLE_USERS).insert(input)

        return create
    }

    public findUser = async (colunm?: string, value?: string | number | Array<string | number>): Promise<UserDB[]> => {
        
        if(value && colunm){
            const result: UserDB[] = await DatabaseConnection.connection(UserDatabase.TABLE_USERS).whereIn(colunm, [value])

            return result
        }

        const result: UserDB[] = await DatabaseConnection.connection(UserDatabase.TABLE_USERS)
        return result
    
    }
}