import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { ObraService } from './obra.service';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Controller('obra')
export class ObraController {
  private readonly logger = new Logger(ObraController.name);

  constructor(private readonly obraService: ObraService) {}

  @Post()
  async create(@Body() createObraDto: CreateObraDto) {
    this.logger.log('Creating obra with data: ' + JSON.stringify(createObraDto));
    return await this.obraService.create(createObraDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all obras');
    return await this.obraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching obra with id: ' + id);
    return await this.obraService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateObraDto: UpdateObraDto) {
    this.logger.log('Updating obra with id: ' + id + ' with data: ' + JSON.stringify(updateObraDto));
    return await this.obraService.update(id, updateObraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing obra with id: ' + id);
    return await this.obraService.remove(id);
  }
}
