import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  let config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const PORT = process.env.PORT || config.get<number>('PORT');
  const configDocs = new DocumentBuilder()
    .setTitle('wefinex ')
    .setDescription('wefinex Api')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('backend-wefinex')
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(PORT);
  console.log('App Running On Port : ' + PORT);
}
bootstrap();
