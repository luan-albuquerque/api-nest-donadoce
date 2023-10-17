import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/config/swagger/swagger-config';
import * as dayjs from "dayjs"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  
  console.log({
    gte: dayjs().minute(0).second(0).millisecond(0).toDate(),
    lte: dayjs().minute(0).second(0).millisecond(0).add(1, 'day').toDate(),
    t: dayjs().toDate(),
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3100);
}
bootstrap();
