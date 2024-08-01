import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DiarioDeObra } from 'src/diario-de-obra/diario-de-obra.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class MaterialDiario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiarioDeObra, { eager: true })
  diario: DiarioDeObra;

  @ManyToOne(() => Material, { eager: true })
  material: Material;

  @Column('int')
  quantidade: number;
}
