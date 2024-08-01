import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiarioDeObraDto {
  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @IsNumber()
  @IsNotEmpty()
  obraId: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
