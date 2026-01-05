import { NestFactory } from '@nestjs/core';
import { AiServerModule } from './ai-server.module';

async function bootstrap() {
  const app = await NestFactory.create(AiServerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
