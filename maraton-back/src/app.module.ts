import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletasModule } from './modules/atletas/atletas.module';
import { CiudadesModule } from './modules/ciudades/ciudades.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pablo',
    password: '1234',
    database: 'maraton',
    autoLoadEntities: true, // 🔥 Esto hace que no tengas que registrar cada entidad manualmente
    synchronize: true, // ⚠️ Solo para desarrollo
  }), AtletasModule, CiudadesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
