import { Module } from '@nestjs/common';
import { AiServerController } from './ai-server.controller';
import { AiServerService } from './ai-server.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [AiServerController],
  providers: [AiServerService],
})
export class AiServerModule {}
