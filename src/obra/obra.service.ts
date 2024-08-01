import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './obra.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Injectable()
export class ObraService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
  ) {}

  async create(createObraDto: CreateObraDto): Promise<Obra> {
    const obra = this.obraRepository.create(createObraDto);
    return await this.obraRepository.save(obra);
  }

  async findAll(): Promise<Obra[]> {
    return await this.obraRepository.find();
  }


  async findOne(id: number): Promise<Obra> {
    const obra = await this.obraRepository.findOne({ where: { id } });
    if (!obra) {
      throw new NotFoundException(`Obra with ID ${id} not found`);
    }
    return obra;
  }

  async update(id: number, updateObraDto: UpdateObraDto): Promise<Obra> {
    const obra = await this.findOne(id);
    Object.assign(obra, updateObraDto);
    return await this.obraRepository.save(obra);
  }

  async remove(id: number): Promise<void> {
    const result = await this.obraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Obra with ID ${id} not found`);
    }
  }
}
