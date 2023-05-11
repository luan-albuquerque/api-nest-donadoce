import { Token } from "../entities/Token";

export abstract class TokenRepository {
   
    abstract findbyOne(user_id: string): Promise<Token>
    abstract create(): Promise<void>

}