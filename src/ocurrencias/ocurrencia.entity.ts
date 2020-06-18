import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Reunion } from 'src/reuniones/reunion.entity';
import { Grabacion } from 'src/grabaciones/grabacion.entity';

@Entity('ocurrencia')
export class Ocurrencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        unique: true,
    })
    idexterno: string;
    
    @Column({
        unsigned: true,
        precision: 11,
    })
    starttime: number;
    
    @Column({
        comment: 'En segundos',
        precision: 11,
    })
    duracion: number;
    
    @Column({
        length: 45,
    })
    status: string;

    @ManyToOne(type => Reunion, reunion => reunion.ocurrencias, {nullable: false})
    @JoinColumn({ name: "reunionvideoconferenciaId" })
    reunion: Reunion;

    @Column({  type: "int"})
    reunionvideoconferenciaId: number;

    @OneToMany(type => Grabacion, grabacion => grabacion.ocurrencia)
    grabaciones: Grabacion[];
}