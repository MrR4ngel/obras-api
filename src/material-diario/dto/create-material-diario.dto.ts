import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMaterialDiarioDto {
  @IsNotEmpty()
  @IsNumber()
  diarioId: number;

  @IsNotEmpty()
  @IsNumber()
  materialId: number;

  @IsNumber()
  quantidade: number;
}
