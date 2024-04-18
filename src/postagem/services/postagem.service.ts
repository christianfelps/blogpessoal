import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemasService } from "../../temas/services/temas.module";


@Injectable() 
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private TemasService: TemasService
    
    ){}
 

    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            relations:{
                tema: true
            }
        }); //select * from tb_postagens;
        

        
    }
    async findById(id: number): Promise<Postagem>{
        let postagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema: true
            }
        });
        //Checar se a postagem nao foi encontrada
      if (!postagem) 
        throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND)
        return postagem; // retornar a postagem, caso ela exista
        // select * from tb_postagem where id = ?;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true
            }
        })
        //SELECT * FROM tb_postagem WHERE titulo LIKE '%titulo%'
    }

    async create(postagem: Postagem): Promise<Postagem>{

        //Caso o tema tenha sido preenchido
        if(postagem.tema){
            let tema = await this.TemasService.findById(postagem.tema.id)

            if(!tema)
                throw new HttpException("Tema não foi encontrado", HttpStatus.NOT_FOUND)
                
            return await this.postagemRepository.save(postagem)

        }
        // caso o tema não tenha sido preenchido
        return await this.postagemRepository.save(postagem);
    }
    // INSERT INTO tb_ postagens (titulo, texto, date) VALUES (?, ?, server)
   
    async update(postagem: Postagem): Promise<Postagem>{
        let buscaPostagem: Postagem = await this.findById(postagem.id);

        if(!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem Nao foi encontrada!', HttpStatus.NOT_FOUND);
        if(postagem.tema){
            let tema = await this.TemasService.findById(postagem.tema.id)

            if(!tema)
                throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
            return await this.postagemRepository.save(postagem)
        }

        return await this.postagemRepository.save(postagem);
    }
    /* UPDATE tb_ postagens SET titulo = ?, texto = ?, data = server 
     WHERE id = ? */
 

     async delete(id : number): Promise<DeleteResult>{
        let buscaPostagem: Postagem = await this.findById(id);

        if(!buscaPostagem )
            throw new HttpException('Postagem Nao foi encontrada!', HttpStatus.NOT_FOUND);
    

        return await this.postagemRepository.delete(id);

     }

}