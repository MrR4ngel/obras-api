import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiarioDeObra } from './diario-de-obra.entity';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';
import { Obra } from 'src/obra/obra.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class DiarioDeObraService {
  constructor(
    @InjectRepository(DiarioDeObra)
    private readonly diarioDeObraRepository: Repository<DiarioDeObra>,
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createDiarioDeObraDto: CreateDiarioDeObraDto): Promise<DiarioDeObra> {
    const { obraId, usuarioId, ...diarioData } = createDiarioDeObraDto;

    const obra = await this.obraRepository.findOne({ where: { id: obraId } });
    if (!obra) {
      throw new NotFoundException(`Obra with ID ${obraId} not found`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${usuarioId} not found`);
    }

    const diarioDeObra = this.diarioDeObraRepository.create({
      ...diarioData,
      obra,
      usuario,
    });

    return await this.diarioDeObraRepository.save(diarioDeObra);
  }

  async findAll(): Promise<DiarioDeObra[]> {
    return await this.diarioDeObraRepository.find({ relations: ['obra', 'usuario'] });
  }

  async findOne(id: number): Promise<DiarioDeObra> {
    const diarioDeObra = await this.diarioDeObraRepository.findOne({
      where: { id },
      relations: ['obra', 'usuario'],
    });
    if (!diarioDeObra) {
      throw new NotFoundException(`DiarioDeObra with ID ${id} not found`);
    }
    return diarioDeObra;
  }

  async update(id: number, updateDiarioDeObraDto: UpdateDiarioDeObraDto): Promise<DiarioDeObra> {
    const diarioDeObra = await this.findOne(id);

    const { obraId, usuarioId, ...updateData } = updateDiarioDeObraDto;

    if (obraId) {
      const obra = await this.obraRepository.findOne({ where: { id: obraId } });
      if (!obra) {
        throw new NotFoundException(`Obra with ID ${obraId} not found`);
      }
      diarioDeObra.obra = obra;
    }

    if (usuarioId) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
      if (!usuario) {
        throw new NotFoundException(`Usuario with ID ${usuarioId} not found`);
      }
      diarioDeObra.usuario = usuario;
    }

    Object.assign(diarioDeObra, updateData);
    return await this.diarioDeObraRepository.save(diarioDeObra);
  }

  async remove(id: number): Promise<void> {
    const result = await this.diarioDeObraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DiarioDeObra with ID ${id} not found`);
    }
  }
}
