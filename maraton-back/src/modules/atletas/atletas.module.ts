import { Module } from '@nestjs/common';
import { AtletasService } from './atletas.service';
import { AtletasController } from './atletas.controller';
import { Atleta } from './entities/atleta.entity';
import { Ciudad } from '../ciudades/entities/ciudade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Atleta, Ciudad])],
  controllers: [AtletasController],
  providers: [AtletasService],
})
export class AtletasModule { }


