import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transform, TransformFnParams } from "class-transformer";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Temas } from "../../temas/entities/temas.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagem"})  //decorador  
export class Postagem{
   
   @PrimaryGeneratedColumn() // Chave Primaria e Auto_Increment
   @ApiProperty() 
   id: number;

    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Funciona somente em string
    @Column({length: 100, nullable: false})
    titulo:string;


    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Funciona somente em string
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn() //Atualiza automaticamente pegando a data e hora do sistema
     date: Date;

     @ApiProperty()
    @ManyToOne(() => Temas, (tema) => tema.postagem,{
   onDelete: "CASCADE"
   })
     tema: Temas; //Chave estrangeira

   @ApiProperty()
   @ManyToOne(() => Usuario, (usuario) => usuario.postagem,{
      onDelete: "CASCADE"
     })
     usuario: Usuario;
}