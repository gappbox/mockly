export interface Type {
  readonly code: string;
  readonly description: string;
  readonly id: string;
  readonly settings?: TypeSettings;
}

export interface TypeSettings {
  readonly extraction?: Extraction;
  readonly options?: Option[];
}

interface Extraction {
  readonly value: string;
  readonly options: string[];
}

interface Option {
  readonly label?: string;
  readonly name: string;
  readonly options?: string[];
  readonly type: 'string' | 'select' | 'boolean' | 'number';
  readonly value: string | number | boolean;
}