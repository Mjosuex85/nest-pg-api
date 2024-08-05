import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
export class PaginationDto {

    @IsOptional()
    @IsPositive()
    // Hay manera de transformar si unsar el global pipe
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number

}