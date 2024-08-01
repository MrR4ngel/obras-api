import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Obra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 200 })
  endereco: string;

  @Column('date')
  data_inicio: Date;

  @Column('date')
  data_fim: Date;

  @Column({ length: 20 })
  status: string;
}
