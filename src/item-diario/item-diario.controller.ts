import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { ItemDiarioService } from './item-diario.service';
import { CreateItemDiarioDto } from './dto/create-item-diario.dto';
import { UpdateItemDiarioDto } from './dto/update-item-diario.dto';

@Controller('item-diario')
export class ItemDiarioController {
  private readonly logger = new Logger(ItemDiarioController.name);

  constructor(private readonly itemDiarioService: ItemDiarioService) {}

  @Post()
  async create(@Body() createItemDiarioDto: CreateItemDiarioDto) {
    this.logger.log('Creating item-diario with data: ' + JSON.stringify(createItemDiarioDto));
    return await this.itemDiarioService.create(createItemDiarioDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all item-diarios');
    return await this.itemDiarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching item-diario with id: ' + id);
    return await this.itemDiarioService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateItemDiarioDto: UpdateItemDiarioDto) {
    this.logger.log('Updating item-diario with id: ' + id + ' with data: ' + JSON.stringify(updateItemDiarioDto));
    return await this.itemDiarioService.update(id, updateItemDiarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing item-diario with id: ' + id);
    return await this.itemDiarioService.remove(id);
  }
}
