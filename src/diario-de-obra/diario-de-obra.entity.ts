import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Obra } from 'src/obra/obra.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity()
export class DiarioDeObra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  data: Date;

  @ManyToOne(() => Obra, { eager: true })
  id_obra: number;

  @ManyToOne(() => Usuario, { eager: true })
  id_usuario: number;

  @Column('text')
  descricao: string;
    obra: Obra;
    usuario: Usuario;
}
