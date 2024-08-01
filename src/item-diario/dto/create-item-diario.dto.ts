import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDiarioDto {
  @IsNotEmpty()
  diarioId: number;

  @IsNotEmpty()
  itemId: number;

  @IsNumber()
  quantidade: number;
}
