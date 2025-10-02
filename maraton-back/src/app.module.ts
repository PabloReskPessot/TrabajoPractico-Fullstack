import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtletaModule } from './atleta/atleta.module';
import { CiudadesModule } from './ciudades/ciudades.module';

@Module({
  imports: [AtletaModule, CiudadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
