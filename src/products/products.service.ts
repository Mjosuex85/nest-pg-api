import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, Product} from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductSertices')

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,
    @InjectRepository( ProductImage )
    private readonly productImageRepository: Repository<ProductImage>
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(( image: string) => this.productImageRepository.create({ url: image }) )
      })
      await this.productRepository.save( product )

      return {...product, images};

    } catch (error) {
     this.handleDBException(error)
    }
  };

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      //TODO: RELACIONES

      /* Esta relación se puede hacer aqui,
        pero tambien se puede crear en la entity
        con la propiedad

        que hace la realción directamente
        eager: true
      */
      
      /* relations: {
        images: true
      } */
    })

    return products.map(( product ) => ({
      ...product,
      images: product.images.map((img) => img.url)
    }))

  };

  async findOne(term: string) {
    let product: Product;

    if ( isUUID(term) ){
      product = await this.productRepository.findOneBy({ 
        id: term,
      })
    }
    else {
      const queryBilder = this.productRepository.createQueryBuilder('prod') 

      product = await queryBilder.where(
        'UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLocaleLowerCase()
        }
      )
      .leftJoinAndSelect('prod.images', 'prodImages')
      .getOne();      
    }
    
    if( !product ) throw new NotFoundException(`No se encuentre el producto con el slug or id ${term}`)

    return product
  };

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
      images: []
    })

    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

      try {
        await this.productRepository.save( product )
      } catch (error) {
      this.handleDBException(error)
      }

    return product
  };

  async findOnePlain( term: string ) {
    const product = await this.findOne(term)
    return {
      ...product,
      images: product.images.map((img) => img.url)
    }
  };

  async remove( id: string ) {
    const produtct = await this.findOne( id )
    await this.productRepository.remove( produtct )
  }

  private handleDBException( error: any) {
    if(error.code === '23505')
    throw new BadRequestException(error.detail);
    this.logger.error(error)

    throw new InternalServerErrorException('Check server logs')
  }

}
