import type { Category } from './category.model';
import type { Type } from './type.model';

export interface Schema {
  readonly category: Category;
  readonly types: Type[];
}