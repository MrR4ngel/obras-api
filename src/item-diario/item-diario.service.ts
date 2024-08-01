import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDiario } from './item-diario.entity';
import { CreateItemDiarioDto } from './dto/create-item-diario.dto';
import { UpdateItemDiarioDto } from './dto/update-item-diario.dto';
import { DiarioDeObra } from 'src/diario-de-obra/diario-de-obra.entity';
import { Item } from 'src/item/item.entity';

@Injectable()
export class ItemDiarioService {
  constructor(
    @InjectRepository(ItemDiario)
    private readonly itemDiarioRepository: Repository<ItemDiario>,
    @InjectRepository(DiarioDeObra)
    private readonly diarioRepository: Repository<DiarioDeObra>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDiarioDto: CreateItemDiarioDto): Promise<ItemDiario> {
    const { diarioId, itemId, quantidade } = createItemDiarioDto;

    const diario = await this.diarioRepository.findOne({ where: { id: diarioId } });
    if (!diario) {
      throw new NotFoundException(`DiarioDeObra with ID ${diarioId} not found`);
    }

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    const itemDiario = this.itemDiarioRepository.create({
      diario,
      item,
      quantidade,
    });

    return await this.itemDiarioRepository.save(itemDiario);
  }

  async findAll(): Promise<ItemDiario[]> {
    return await this.itemDiarioRepository.find({ relations: ['diario', 'item'] });
  }

  async findOne(id: number): Promise<ItemDiario> {
    const itemDiario = await this.itemDiarioRepository.findOne({ where: { id }, relations: ['diario', 'item'] });
    if (!itemDiario) {
      throw new NotFoundException(`ItemDiario with ID ${id} not found`);
    }
    return itemDiario;
  }

  async update(id: number, updateItemDiarioDto: UpdateItemDiarioDto): Promise<ItemDiario> {
    const itemDiario = await this.findOne(id);

    const { diarioId, itemId, quantidade } = updateItemDiarioDto;

    if (diarioId) {
      const diario = await this.diarioRepository.findOne({ where: { id: diarioId } });
      if (!diario) {
        throw new NotFoundException(`DiarioDeObra with ID ${diarioId} not found`);
      }
      itemDiario.diario = diario;
    }

    if (itemId) {
      const item = await this.itemRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${itemId} not found`);
      }
      itemDiario.item = item;
    }

    if (quantidade !== undefined) {
      itemDiario.quantidade = quantidade;
    }

    return await this.itemDiarioRepository.save(itemDiario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.itemDiarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ItemDiario with ID ${id} not found`);
    }
  }
}
