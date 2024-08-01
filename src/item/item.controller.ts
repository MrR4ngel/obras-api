import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  private readonly logger = new Logger(ItemController.name);

  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    this.logger.log('Creating item with data: ' + JSON.stringify(createItemDto));
    return await this.itemService.create(createItemDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all items');
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching item with id: ' + id);
    return await this.itemService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    this.logger.log('Updating item with id: ' + id + ' with data: ' + JSON.stringify(updateItemDto));
    return await this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing item with id: ' + id);
    return await this.itemService.remove(id);
  }
}
