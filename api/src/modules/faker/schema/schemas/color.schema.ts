import type { Schema } from '../models';

export const colorSchema: Schema = {
  category: {
    id: '67f90258-2a09-4388-889b-5117485a3ddf',
    code: 'color',
    description: 'Module to generate colors.',
  },
  types: [
    {
      id: 'd9f4be5f-7b66-4a30-a9c5-f039adb69065',
      code: 'cssSupportedFunction',
      description: '',
    },
    {
      id: 'd3e9606e-4789-44a9-888b-963215d7bab7',
      code: 'cssSupportedSpace',
      description: '',
    },
    {
      id: '0f2626c6-b25e-4002-a39a-774b7144f15a',
      code: 'human',
      description: '',
    },
    {
      id: '31aa2aad-6641-41b0-bb39-43ea1891b4f0',
      code: 'rgb',
      description: '',
    },
    {
      id: 'c069be37-f483-4a47-a32e-deda7eb1b4a8',
      code: 'space',
      description: '',
    },
  ],
};