import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from '@lib/shared/interceptor/interceptor.interceptor';
import { InterceptorExceptionFilter } from '@lib/shared/interceptor/exceptionFilter';
import { Config } from '@en/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Interceptor())
  app.useGlobalFilters(new InterceptorExceptionFilter())
  await app.listen(Config.ports.server);
}
bootstrap();
