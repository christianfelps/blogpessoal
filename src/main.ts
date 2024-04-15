import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// mudar o fuso horario para brasilia
  process.env.TZ = "-03:00";
// habilitar o banco de dados
  app.useGlobalPipes(new ValidationPipe());
//essencial sem ele não roda o front-end
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
