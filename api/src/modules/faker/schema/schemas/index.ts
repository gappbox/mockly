import type { Schema } from '../models';
import { airlineSchema } from './airline.schema';
import { animalSchema } from './animal.schema';
import { bookSchema } from './book.schema';
import { colorSchema } from './color.schema';

export const schemas: Schema[] = [
  airlineSchema,
  animalSchema,
  bookSchema,
  colorSchema,
];