import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    this.logger.log('Creating usuario with data: ' + JSON.stringify(createUsuarioDto));
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all usuarios');
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching usuario with id: ' + id);
    return await this.usuarioService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    this.logger.log('Updating usuario with id: ' + id + ' with data: ' + JSON.stringify(updateUsuarioDto));
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing usuario with id: ' + id);
    return await this.usuarioService.remove(id);
  }
}
