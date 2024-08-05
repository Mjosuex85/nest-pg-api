import { text } from "stream/consumers";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column( {
        type: 'float',
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'text',
        unique: true
    })
    slug: string;

    @Column({
        type: 'int',
        default: 0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string

    // ESTE BEFOREINSERT se utiliza para transformar una data antes de que pase por el servicio.

    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug){
                this.slug = this.title
                  .toLocaleLowerCase()
                  .replaceAll(' ', '_')
                  .replaceAll("'",'')
        }
           
         this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'",'')
    };

    /* @BeforeInsert()
    titleToLowerCase() {
        this.title = this.title.toLocaleLowerCase()
    } */

};
