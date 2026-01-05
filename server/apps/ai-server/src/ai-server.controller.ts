import { Controller, Get } from '@nestjs/common';
import { AiServerService } from './ai-server.service';

@Controller()
export class AiServerController {
  constructor(private readonly aiServerService: AiServerService) {}

  @Get()
  getHello(): string {
    return this.aiServerService.getHello();
  }
}
