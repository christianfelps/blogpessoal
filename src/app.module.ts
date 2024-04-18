import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemasModule } from './temas/temas.module';
import { Temas } from './temas/entities/temas.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      password:'root',
      database:'db_blogpessoal',
      entities: [Postagem, Temas],
      synchronize: true,
      logging: true,
    }),
    PostagemModule,
    TemasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
