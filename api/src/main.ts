import type { ValidationPipeOptions } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { UseContainerOptions } from 'class-validator';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { validationExceptionFactory } from './exceptions/validation';

const PORT = process.env.PORT ?? 3000;

const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  exceptionFactory: validationExceptionFactory,
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
};

const CONTAINER_OPTIONS: UseContainerOptions = {
  fallbackOnErrors: true,
};

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));

  useContainer(app.select(AppModule), CONTAINER_OPTIONS);

  await app.listen(PORT);
}

bootstrap()
  .then(() => Logger.log(`Application is running on ${PORT} port.`))
  .catch((reason) => Logger.error(reason));
