import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidCategory, IsValidType } from '../../schema';

export class FieldMetadataDto {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsValidCategory()
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsValidType('category')
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  settings?: {
    extract?: string;
    options?: Record<string, unknown>;
  };
}