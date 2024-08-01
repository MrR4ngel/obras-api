import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { DiarioDeObraService } from './diario-de-obra.service';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';

@Controller('diario-de-obra')
export class DiarioDeObraController {
  private readonly logger = new Logger(DiarioDeObraController.name);

  constructor(private readonly diarioDeObraService: DiarioDeObraService) {}

  @Post()
  async create(@Body() createDiarioDeObraDto: CreateDiarioDeObraDto) {
    this.logger.log('Creating diario-de-obra with data: ' + JSON.stringify(createDiarioDeObraDto));
    return await this.diarioDeObraService.create(createDiarioDeObraDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all diario-de-obras');
    return await this.diarioDeObraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching diario-de-obra with id: ' + id);
    return await this.diarioDeObraService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDiarioDeObraDto: UpdateDiarioDeObraDto) {
    this.logger.log('Updating diario-de-obra with id: ' + id + ' with data: ' + JSON.stringify(updateDiarioDeObraDto));
    return await this.diarioDeObraService.update(id, updateDiarioDeObraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing diario-de-obra with id: ' + id);
    return await this.diarioDeObraService.remove(id);
  }
}
