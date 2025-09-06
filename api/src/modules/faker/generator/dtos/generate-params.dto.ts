import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, Max, Min, ValidateNested } from 'class-validator';
import { FieldMetadataDto } from './field-metadata.dto';

export class GenerateParamsDto {
  @Max(3000)
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  count: number;

  @ValidateNested({ each: true })
  @Type(() => FieldMetadataDto)
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsArray()
  fields: FieldMetadataDto[];
}
