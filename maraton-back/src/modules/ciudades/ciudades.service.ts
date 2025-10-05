import { Injectable } from '@nestjs/common';
import { CreateCiudadeDto } from './dto/create-ciudade.dto';
import { UpdateCiudadeDto } from './dto/update-ciudade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudade.entity';


@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) { }

  create(createCiudadeDto: CreateCiudadeDto) {
    const nuevaCiudad = this.ciudadRepository.create(createCiudadeDto);
    return this.ciudadRepository.save(nuevaCiudad);
  }


  findAll() {
    return this.ciudadRepository.find();
  }

  findOne(id: number) {
    return this.ciudadRepository.findOneBy({ id });
  }

  update(id: number, updateCiudadeDto: UpdateCiudadeDto) {
    return this.ciudadRepository.update(id, updateCiudadeDto);
  }

  remove(id: number) {
    return this.ciudadRepository.delete(id);
  }
}
