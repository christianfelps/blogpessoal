import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Temas } from "../entities/temas.entity";
import { TemasService } from "../services/temas.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@Controller("/temas")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TemasController {
    constructor(private readonly temasService: TemasService) {}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Temas[]> {
        return this.temasService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)id: number): Promise<Temas>{
        return this.temasService.findById(id);
    
    }
    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param('descricao')descricao: string): Promise<Temas[]>{
        return this.temasService.findByDescricao(descricao);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()tema: Temas): Promise<Temas>{
        return this.temasService.create(tema)
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() temas: Temas): Promise<Temas>{
        return this.temasService.update(temas)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.temasService.delete(id)
    }

}