import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';



@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductSertices')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save( product )

      return product;

    } catch (error) {
     this.handleDBException(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      //TODO: RELACIONES
    })
    return products
  } 

  async findOne(term: string) {

    //TODO VALIDAR EL UUID POR ESTA ZONA

    let product: any;

    console.log({term})

    if ( isUUID(term) ) {
      product = await this.productRepository.findOneBy({id: term})
      console.log('no pasa')
    }
    else {
      const queryBilder = this.productRepository.createQueryBuilder() 

      console.log({queryBilder})

      product = await queryBilder.where(
        'UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLocaleLowerCase()
        }
      ).getOne();

      console.log({product})

      return product;
    }

    

    if( !product ) throw new NotFoundException(`No se encuentre el producto con el slug or id ${term}`)

    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove( id: string ) {

    await this.findOne( id )
    await this.productRepository.delete( { id } )

  }

  private handleDBException( error: any) {

    if(error.code === '23505')
    throw new BadRequestException(error.detail);
    this.logger.error(error)

    throw new InternalServerErrorException('Check server logs')
  }

}
