import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDiarioDto } from './create-material-diario.dto';

export class UpdateMaterialDiarioDto extends PartialType(CreateMaterialDiarioDto) {}
