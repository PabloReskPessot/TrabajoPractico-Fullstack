import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ciudad } from 'src/modules/ciudades/entities/ciudade.entity';

@Entity()
export class Atleta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: number;

    @Column()
    nombre: string;

    @Column()
    tiempo: string;

    @Column()
    posicion: number;


    // Relación N:1 con Ciudad
    @ManyToOne(() => Ciudad, (ciudad) => ciudad.atletas, { eager: true })
    ciudad: Ciudad;  // ← Solo la relación, sin ciudadId adicional

    // Relación N:1 con Ciudad
    // @ManyToOne(() => Ciudad, (ciudad) => ciudad.atletas, { eager: true })
    // @JoinColumn({ name: 'ciudadId' })  // ← Agregar esto
    // ciudad: Ciudad;

    // // ← Agregar esta columna para el ID
    // @Column()
    // ciudadId: number;

}
