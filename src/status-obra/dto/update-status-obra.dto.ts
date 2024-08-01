import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusObraDto } from './create-status-obra.dto';

export class UpdateStatusObraDto extends PartialType(CreateStatusObraDto) {}
