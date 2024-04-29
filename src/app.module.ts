import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemasModule } from './temas/temas.module';
import { Temas } from './temas/entities/temas.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Bcrypt } from './auth/bcrypt/bcrypt';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      password:'root',
      database:'db_blogpessoal',
      entities: [Postagem, Temas, Usuario, Bcrypt],
      synchronize: true,
      // logging: true,
    }),
    PostagemModule,
    TemasModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
