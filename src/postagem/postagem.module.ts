import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemController } from "./controllers/postagem.controller";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { TemasService } from "../temas/services/temas.module";
import { TemasModule } from "../temas/temas.module";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemasModule],
    providers: [PostagemService, TemasService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule { }