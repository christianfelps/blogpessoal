import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Temas } from "../entities/temas.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemasService{
    constructor(
        @InjectRepository (Temas)
        private  temasRepository: Repository<Temas>
    ){}

    async findAll(): Promise<Temas[]>{
        return await this.temasRepository.find({
            relations:{
                postagem: true
            }
        });
    }

        async findById(id: number): Promise<Temas>{
            let temas = await this.temasRepository.findOne({
                where:{
                
                    id
                },
                relations:{
                    postagem: true
                }
            });
            if(!temas)
                throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND)
                return temas
        }
        async findByDescricao(descricao: string): Promise<Temas[]>{
            return await this.temasRepository.find({
                where:{
                    descricao: ILike(`%${descricao}%`)
                },
                relations:{
                    postagem: true
                }
            })
            //SELECT * FROM tb_postagem WHERE titulo LIKE '%titulo%'
        }
        async create(tema: Temas): Promise<Temas>{
            return await  this.temasRepository.save(tema)
        }

        async update(temas: Temas): Promise<Temas>{
            let buscaTema: Temas = await this.findById(temas.id);

            if(!buscaTema || !temas.id)
                throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        return await this.temasRepository.save(temas)
        
        }
        async delete(id : number): Promise<DeleteResult>{
            let buscaTema: Temas = await this.findById(id);

            if(!buscaTema)
                throw new HttpException('Tema não foi encontrado', HttpStatus.NOT_FOUND);

            return await this.temasRepository.delete(id)
        }

}