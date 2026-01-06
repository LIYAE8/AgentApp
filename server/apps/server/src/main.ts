import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from '@lib/shared/interceptor/interceptor.interceptor';
import { config } from '@en/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Interceptor())
  console.log(config.port.server);
  console.log(config.port.aiServer);
  console.log(config.port.web);
  await app.listen(config.port.server);
}
bootstrap();
