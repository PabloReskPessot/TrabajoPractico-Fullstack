import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Atleta } from '../../atletas/entities/atleta.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  // Relación 1:N con Atleta
  @OneToMany(() => Atleta, (atleta) => atleta.ciudad)
  atletas: Atleta[];
}
