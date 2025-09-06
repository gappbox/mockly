import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TypesParamsDto } from './dtos';
import { Category, Type } from './models';
import { SchemaService } from './schema.service';

@Controller('api/faker/schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  getCategories(): Category[] {
    return this.schemaService.getCategories();
  }

  @Get('categories/:category/types')
  @HttpCode(HttpStatus.OK)
  getTypesByCategory(@Param() params: TypesParamsDto): Type[] {
    return this.schemaService.getTypesByCategory(params.category);
  }

  @Get('types')
  @HttpCode(HttpStatus.OK)
  getTypes(): Type[] {
    return this.schemaService.getTypes();
  }
}