import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      // EN PRODUCCIÓN NO SE HACE LA SINCRONIZACIÓN DE LA BASE DE DATOS EN TRUE, SE USA MIGRACIÓN
      synchronize: true
    }),
    ProductsModule,
    CommonModule
  ],
})
export class AppModule {}
