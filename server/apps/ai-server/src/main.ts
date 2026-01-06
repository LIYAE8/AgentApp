import { NestFactory } from '@nestjs/core';
import { AiServerModule } from './ai-server.module';
import { Interceptor } from '@lib/shared/interceptor/interceptor.interceptor';
import { config } from '@en/config'

async function bootstrap() {
  const app = await NestFactory.create(AiServerModule);
  app.useGlobalInterceptors(new Interceptor())
  await app.listen(config.port.aiServer);
}
bootstrap();
