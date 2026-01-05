import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from '@lib/shared/interceptor/interceptor.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Interceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
