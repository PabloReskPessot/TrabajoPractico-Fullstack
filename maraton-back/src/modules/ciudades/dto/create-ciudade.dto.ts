import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCiudadeDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

}
