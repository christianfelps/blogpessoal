import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable() 
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){} 

    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find(); //select * from tb_postagens;
        

        
    }
    async findById(id: number): Promise<Postagem>{
        let postagem = await this.postagemRepository.findOne({
            where:{
                id
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
            }
        })
        //SELECT * FROM tb_postagem WHERE titulo LIKE '%titulo%'
    }

    async create(postagem: Postagem): Promise<Postagem>{
        return await this.postagemRepository.save(postagem);
    }
    // INSERT INTO tb_ postagens (titulo, texto, date) VALUES (?, ?, server)
   
    async update(postagem: Postagem): Promise<Postagem>{
        let buscaPostagem: Postagem = await this.findById(postagem.id);

        if(!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem Nao foi encontrada!', HttpStatus.NOT_FOUND);
    

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