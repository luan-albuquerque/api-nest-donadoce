import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
class BCryptHashPassword implements IHashPasswordContract {
    compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed)
    }
    generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

}

export default BCryptHashPassword