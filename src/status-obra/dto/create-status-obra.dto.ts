import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStatusObraDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
}

