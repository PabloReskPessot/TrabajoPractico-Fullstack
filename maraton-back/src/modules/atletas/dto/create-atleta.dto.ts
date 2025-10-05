import { isInt, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAtletaDto {
    @Type(() => Number)
    @IsInt()
    dni: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    tiempo: string;

    @Type(() => Number)
    @IsInt()
    posicion: number;

    @Type(() => Number)
    @IsInt()
    ciudadId: number;
}
