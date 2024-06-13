import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/common/all-exceptions.filter';
import { ValidateHeaderMiddleware } from './common/validate-header.middleware';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  snapshot: true
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(new ValidateHeaderMiddleware().use);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));
  await app.listen(3001);
}

bootstrap();
