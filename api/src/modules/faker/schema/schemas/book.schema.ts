import type { Schema } from '../models';

export const bookSchema: Schema = {
  category: {
    id: 'a0d85391-9a20-4cdf-8d32-c79b361fa9ea',
    code: 'book',
    description: 'Module to generate book related entries.',
  },
  types: [
    {
      id: '9fa03476-ef8e-49eb-9be5-cd3e0bc09532',
      code: 'author',
      description: '',
    },
    {
      id: 'a84ee7e6-ed42-42d8-b7e2-d545de490646',
      code: 'format',
      description: '',
    },
    {
      id: 'db5ae5d2-c000-4a82-b7cb-9b050684918a',
      code: 'genre',
      description: '',
    },
    {
      id: '0810cdfb-7dbe-42cd-9128-57e3ff98da15',
      code: 'publisher',
      description: '',
    },
    {
      id: '84c403e2-94f2-46c4-9cf4-50b5c89b2596',
      code: 'series',
      description: '',
    },
    {
      id: 'e98a6470-942f-4224-a7ad-cdebc0876248',
      code: 'title',
      description: '',
    },
  ],
};