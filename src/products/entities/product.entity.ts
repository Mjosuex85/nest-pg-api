import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

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
    gender: string;

    @Column({
        array: true,
        type: 'text',
        default: []
    })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true }
    )
    images?: ProductImage

    // ESTE BEFOREINSERT se utiliza para transformar una data antes de que pase por el servicio.

    @BeforeInsert()
    checkSlugInsert(slug?: string) {
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

    @BeforeUpdate()
    checkSlugUpdate() {
        return this.checkSlugInsert( this.slug )
    }

};
