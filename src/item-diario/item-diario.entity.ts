import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DiarioDeObra } from 'src/diario-de-obra/diario-de-obra.entity';
import { Item } from 'src/item/item.entity';

@Entity()
export class ItemDiario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiarioDeObra, { eager: true })
  diario: DiarioDeObra;

  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column('int')
  quantidade: number;
}
