import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagem"})  //decorador  
export class Postagem{
   
   @PrimaryGeneratedColumn() // Chave Primaria e Auto_Increment
    id: number;

    @IsNotEmpty() // Funciona somente em string
    @Column({length: 100, nullable: false})
    titulo:string;

    @IsNotEmpty() // Funciona somente em string
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //Atualiza automaticamente pegando a data e hora do sistema
    date: Date;
}