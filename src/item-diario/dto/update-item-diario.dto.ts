import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDiarioDto } from './create-item-diario.dto';

export class UpdateItemDiarioDto extends PartialType(CreateItemDiarioDto) {}
