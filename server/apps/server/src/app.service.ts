import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
@Injectable()
export class AppService {
  constructor(private readonly prisma:PrismaService){

  }
  getHello(): string {
    return 'testAPP'
  }
}
