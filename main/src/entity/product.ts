import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    
    @ObjectIdColumn()
    id: ObjectID;

    @Column({unique: true})
    mainId: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column({default: 0})
    likes: number;
} 

export default Product;