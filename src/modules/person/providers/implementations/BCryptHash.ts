import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import IHash from '../contract/IHash';

@Injectable()
export default class BCryptHash implements IHash {
    generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

}