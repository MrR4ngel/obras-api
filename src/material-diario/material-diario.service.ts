import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialDiario } from './material-diario.entity';
import { CreateMaterialDiarioDto } from './dto/create-material-diario.dto';
import { UpdateMaterialDiarioDto } from './dto/update-material-diario.dto';
import { DiarioDeObra } from 'src/diario-de-obra/diario-de-obra.entity';
import { Material } from 'src/material/material.entity';

@Injectable()
export class MaterialDiarioService {
  constructor(
    @InjectRepository(MaterialDiario)
    private readonly materialDiarioRepository: Repository<MaterialDiario>,
    @InjectRepository(DiarioDeObra)
    private readonly diarioRepository: Repository<DiarioDeObra>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createMaterialDiarioDto: CreateMaterialDiarioDto): Promise<MaterialDiario> {
    const { diarioId, materialId, quantidade } = createMaterialDiarioDto;

    const diario = await this.diarioRepository.findOne({ where: { id: diarioId } });
    if (!diario) {
      throw new NotFoundException(`DiarioDeObra with ID ${diarioId} not found`);
    }

    const material = await this.materialRepository.findOne({ where: { id: materialId } });
    if (!material) {
      throw new NotFoundException(`Material with ID ${materialId} not found`);
    }

    const materialDiario = this.materialDiarioRepository.create({
      diario,
      material,
      quantidade,
    });

    return await this.materialDiarioRepository.save(materialDiario);
  }

  async findAll(): Promise<MaterialDiario[]> {
    return await this.materialDiarioRepository.find({ relations: ['diario', 'material'] });
  }

  async findOne(id: number): Promise<MaterialDiario> {
    const materialDiario = await this.materialDiarioRepository.findOne({ where: { id }, relations: ['diario', 'material'] });
    if (!materialDiario) {
      throw new NotFoundException(`MaterialDiario with ID ${id} not found`);
    }
    return materialDiario;
  }

  async update(id: number, updateMaterialDiarioDto: UpdateMaterialDiarioDto): Promise<MaterialDiario> {
    const materialDiario = await this.findOne(id);

    const { diarioId, materialId, quantidade } = updateMaterialDiarioDto;

    if (diarioId) {
      const diario = await this.diarioRepository.findOne({ where: { id: diarioId } });
      if (!diario) {
        throw new NotFoundException(`DiarioDeObra with ID ${diarioId} not found`);
      }
      materialDiario.diario = diario;
    }

    if (materialId) {
      const material = await this.materialRepository.findOne({ where: { id: materialId } });
      if (!material) {
        throw new NotFoundException(`Material with ID ${materialId} not found`);
      }
      materialDiario.material = material;
    }

    if (quantidade !== undefined) {
      materialDiario.quantidade = quantidade;
    }

    return await this.materialDiarioRepository.save(materialDiario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.materialDiarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MaterialDiario with ID ${id} not found`);
    }
  }
}
