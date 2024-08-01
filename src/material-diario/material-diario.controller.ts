import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { MaterialDiarioService } from './material-diario.service';
import { CreateMaterialDiarioDto } from './dto/create-material-diario.dto';
import { UpdateMaterialDiarioDto } from './dto/update-material-diario.dto';

@Controller('material-diario')
export class MaterialDiarioController {
  private readonly logger = new Logger(MaterialDiarioController.name);

  constructor(private readonly materialDiarioService: MaterialDiarioService) {}

  @Post()
  async create(@Body() createMaterialDiarioDto: CreateMaterialDiarioDto) {
    this.logger.log('Creating material-diario with data: ' + JSON.stringify(createMaterialDiarioDto));
    return await this.materialDiarioService.create(createMaterialDiarioDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all material-diarios');
    return await this.materialDiarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching material-diario with id: ' + id);
    return await this.materialDiarioService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMaterialDiarioDto: UpdateMaterialDiarioDto) {
    this.logger.log('Updating material-diario with id: ' + id + ' with data: ' + JSON.stringify(updateMaterialDiarioDto));
    return await this.materialDiarioService.update(id, updateMaterialDiarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing material-diario with id: ' + id);
    return await this.materialDiarioService.remove(id);
  }
}
