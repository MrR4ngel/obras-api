import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
  private readonly logger = new Logger(MaterialController.name);

  constructor(private readonly materialService: MaterialService) {}

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    this.logger.log('Creating material with data: ' + JSON.stringify(createMaterialDto));
    return await this.materialService.create(createMaterialDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all materials');
    return await this.materialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching material with id: ' + id);
    return await this.materialService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMaterialDto: UpdateMaterialDto) {
    this.logger.log('Updating material with id: ' + id + ' with data: ' + JSON.stringify(updateMaterialDto));
    return await this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing material with id: ' + id);
    return await this.materialService.remove(id);
  }
}
