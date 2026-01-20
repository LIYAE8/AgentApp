import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from '@lib/shared/interceptor/interceptor.interceptor';
import { InterceptorExceptionFilter } from '@lib/shared/interceptor/exceptionFilter';
import { Config } from '@en/config'
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Interceptor())
  app.useGlobalFilters(new InterceptorExceptionFilter())
  app.setGlobalPrefix('api');
  app.enableVersioning({defaultVersion: '1', type: VersioningType.URI})
  await app.listen(Config.ports.server);
}
bootstrap();
