import { Injectable } from '@nestjs/common';

@Injectable()
export class AiServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
