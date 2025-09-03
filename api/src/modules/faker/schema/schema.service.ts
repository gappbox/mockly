import { Injectable } from '@nestjs/common';
import { Category, Type } from './models';
import { schemas } from './schemas';

@Injectable()
export class SchemaService {
  public getCategories(): Category[] {
    return schemas.map(({ category }) => category);
  }

  public getTypesByCategory(category: string): Type[] {
    return schemas.find((schema) => schema.category.code === category)?.types ?? [];
  }

  public getTypes(): Type[] {
    return schemas.map(({ types }) => types).flat();
  }
}