import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemasService } from "./services/temas.module";
import { TemasController } from "./controllers/temas.controller";
import { Temas } from "./entities/temas.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Temas])],
    providers: [TemasService],
    controllers: [TemasController],
    exports: [TypeOrmModule]
})
export class TemasModule { }