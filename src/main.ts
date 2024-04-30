import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Christian Alvim","https://github.com/christianfelps", "christianfelipialvim@gmail.com" )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

// mudar o fuso horario para brasilia
  process.env.TZ = "-03:00";
// habilitar o banco de dados
  app.useGlobalPipes(new ValidationPipe());
//essencial sem ele não roda o front-end
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
