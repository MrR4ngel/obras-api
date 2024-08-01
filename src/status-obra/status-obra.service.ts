import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusObra } from './status-obra.entity';
import { CreateStatusObraDto } from './dto/create-status-obra.dto';
import { UpdateStatusObraDto } from './dto/update-status-obra.dto';

@Injectable()
export class StatusObraService {
  constructor(
    @InjectRepository(StatusObra)
    private readonly statusObraRepository: Repository<StatusObra>,
  ) {}

  async create(createStatusObraDto: CreateStatusObraDto): Promise<StatusObra> {
    const statusObra = this.statusObraRepository.create(createStatusObraDto);
    return await this.statusObraRepository.save(statusObra);
  }

  async findAll(): Promise<StatusObra[]> {
    return await this.statusObraRepository.find();
  }

  async findOne(id: number): Promise<StatusObra> {
    const statusObra = await this.statusObraRepository.findOne({ where: { id } });
    if (!statusObra) {
      throw new NotFoundException(`StatusObra with ID ${id} not found`);
    }
    return statusObra;
  }

  async update(id: number, updateStatusObraDto: UpdateStatusObraDto): Promise<StatusObra> {
    const statusObra = await this.findOne(id);
    Object.assign(statusObra, updateStatusObraDto);
    return await this.statusObraRepository.save(statusObra);
  }

  async remove(id: number): Promise<void> {
    const result = await this.statusObraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StatusObra with ID ${id} not found`);
    }
  }
}
