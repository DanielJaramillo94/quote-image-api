import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('quote')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    // all generated quotes will be storaged
    // then, it cannot be garanteed there will be a unique quote
    @Column({
        length: 1024,
    })
    quote: string;

    @Column({
        length: 1024,
    })
    image: string;
}