import { Injectable } from '@nestjs/common';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atleta } from './entities/atleta.entity';

@Injectable()
export class AtletasService {

  constructor(
    @InjectRepository(Atleta)
    private readonly atletaRepository: Repository<Atleta>,
  ) { }
  // create(createAtletaDto: CreateAtletaDto) {
  //   // 1. Crear una instancia de la entidad en memoria
  //   const nuevoAtleta = this.atletaRepository.create(createAtletaDto);

  //   // 2. Guardar la instancia en la base de datos y devolver la entidad creada
  //   //    TypeORM realiza la inserción (INSERT) de forma automática.
  //   return this.atletaRepository.save(nuevoAtleta);
  // } 

  // atleta.service.ts
  async create(createAtletaDto: CreateAtletaDto) {
    const nuevoAtleta = this.atletaRepository.create({
      ...createAtletaDto,
      ciudad: { id: createAtletaDto.ciudadId } as any,
    });

    return this.atletaRepository.save(nuevoAtleta);
  }

  findAll() {
    return this.atletaRepository.find();
  }

  findOne(id: number) {
    // return this.atletaRepository.findOne();
    return this.atletaRepository.findOneBy({ id });
  }

  update(id: number, updateAtletaDto: UpdateAtletaDto) {
    return this.atletaRepository.update(id, updateAtletaDto);
  }

  remove(id: number) {
    return this.atletaRepository.delete(id);
  }
}
