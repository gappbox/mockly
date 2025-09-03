import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TypesParamsDto } from './dtos';
import { Category, Type } from './models';
import { SchemaService } from './schema.service';

@Controller('api/faker/schema')
export class SchemaController {
  public constructor(private readonly schemaService: SchemaService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  public getCategories(): Category[] {
    return this.schemaService.getCategories();
  }

  @Get('categories/:category/types')
  @HttpCode(HttpStatus.OK)
  public getTypesByCategory(@Param() params: TypesParamsDto): Type[] {
    return this.schemaService.getTypesByCategory(params.category);
  }

  @Get('types')
  @HttpCode(HttpStatus.OK)
  public getTypes(): Type[] {
    return this.schemaService.getTypes();
  }
}