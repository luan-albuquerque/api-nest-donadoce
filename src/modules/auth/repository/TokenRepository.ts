import { Token } from "../entities/Token";

export abstract class TokenRepository {
   
    abstract findbyOne(token: string): Promise<Token>

}