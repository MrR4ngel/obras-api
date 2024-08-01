import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateObraDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsDate()
  data_inicio: Date;

  @IsOptional()
  @IsDate()
  data_fim: Date;

  @IsNotEmpty()
  @IsString()
  status: string;
}
