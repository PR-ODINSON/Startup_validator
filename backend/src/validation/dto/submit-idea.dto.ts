import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitIdeaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
