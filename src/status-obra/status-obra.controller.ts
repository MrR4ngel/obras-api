import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { StatusObraService } from './status-obra.service';
import { CreateStatusObraDto } from './dto/create-status-obra.dto';
import { UpdateStatusObraDto } from './dto/update-status-obra.dto';

@Controller('status-obra')
export class StatusObraController {
  private readonly logger = new Logger(StatusObraController.name);

  constructor(private readonly statusObraService: StatusObraService) {}

  @Post()
  async create(@Body() createStatusObraDto: CreateStatusObraDto) {
    this.logger.log('Creating status-obra with data: ' + JSON.stringify(createStatusObraDto));
    return await this.statusObraService.create(createStatusObraDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all status-obras');
    return await this.statusObraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log('Fetching status-obra with id: ' + id);
    return await this.statusObraService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateStatusObraDto: UpdateStatusObraDto) {
    this.logger.log('Updating status-obra with id: ' + id + ' with data: ' + JSON.stringify(updateStatusObraDto));
    return await this.statusObraService.update(id, updateStatusObraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log('Removing status-obra with id: ' + id);
    return await this.statusObraService.remove(id);
  }
}
