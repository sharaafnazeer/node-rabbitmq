import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    mainId: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column({default: 0})
    likes: number;
}