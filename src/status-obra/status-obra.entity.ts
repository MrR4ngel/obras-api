import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatusObra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  descricao: string;
}
