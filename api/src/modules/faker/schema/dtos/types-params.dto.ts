import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidCategory } from '../validators/category';

export class TypesParamsDto {
  @IsValidCategory()
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;
}
