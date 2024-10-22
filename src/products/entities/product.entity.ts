import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { Transform } from "class-transformer";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float',{
        default: 0
    })
    price: number;

    @Column('text',{
        nullable: true
    })
    description: string;

    @Column('text',{
        unique: true
    })
    slug: string;

    @Column('int',{
        default: 0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @OneToMany(
        // Primer callback, es lo que va a retornar
        () => ProductImage,
        // segundo callback
        ( productImage ) => productImage.product,
        // cascade busca eliminar o actualizar las imagenes relacionadas a ese producto
        { cascade: true, eager: true }
     )
    // ESTE ENFOQUE DE TRANSFORM SIRVE SI QUISIERAMOS QUE SIEMPRE TRANFORME LA DATA DE UNA MANERA
    @Transform(({value}) => {
        return value.map((image: ProductImage) => image.url)
    })
    // Images es de tipo ProductImage (que es la entidad) no una intefaces o type comun
    images?: ProductImage[]

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
