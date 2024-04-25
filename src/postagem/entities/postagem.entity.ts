import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Temas } from "../../temas/entities/temas.entity";
import { Transform, TransformFnParams } from "class-transformer";
import { Usuario } from "../../usuario/entities/usuario.entities";

@Entity({name: "tb_postagem"})  //decorador  
export class Postagem{
   
   @PrimaryGeneratedColumn() // Chave Primaria e Auto_Increment
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Funciona somente em string
    @Column({length: 100, nullable: false})
    titulo:string;


    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Funciona somente em string
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //Atualiza automaticamente pegando a data e hora do sistema
     date: Date;

    @ManyToOne(() => Temas, (tema) => tema.postagem,{
   onDelete: "CASCADE"
   })
     tema: Temas; //Chave estrangeira


   @ManyToOne(() => Usuario, (usuario) => usuario.postagem,{
      onDelete: "CASCADE"
     })
     usuario: Usuario
}