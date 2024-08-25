import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HOST, PORT, SERVER_PREFIX } from './config';
import { CustomValidationPipe } from './common/pipes/validation-from-request-pipe';
import { SwaggerConfigure } from './common/swaggers';
import { HttpExceptionFilter } from './config/exception/http-filter.exception';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(SERVER_PREFIX);
  await SwaggerConfigure.setup(app);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
  Logger.log(`Server is listening at ${HOST}:${PORT}`);
}
bootstrap();
