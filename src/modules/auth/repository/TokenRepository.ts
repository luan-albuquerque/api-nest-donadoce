import CreateTokenDTO from "../dtos/CreateTokenDTO";
import Token from "../entities/Token";


export abstract class TokenRepository {
   
    abstract findbyOne(user_id: string): Promise<Token>
    abstract findbyToken(token: string): Promise<Token>
    abstract findTokensByUser(user_id: string): Promise<Token[]>
    abstract create(data: CreateTokenDTO ): Promise<Token>
    abstract update(id: string,used: boolean, used_in: Date): Promise<void>


}