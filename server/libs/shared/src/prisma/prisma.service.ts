import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
    getHello():string{
        return "Hello,Nest!"
    }
}
