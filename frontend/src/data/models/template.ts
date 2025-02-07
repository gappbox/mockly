import { Field } from './field.ts';

export type Template = {
  fields: Field[];
  id: string;
  isReadonly: boolean;
  name: string;
};