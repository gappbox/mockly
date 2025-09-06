import type { Schema } from '../models';

export const colorSchema: Schema = {
  category: {
    id: '67f90258-2a09-4388-889b-5117485a3ddf',
    code: 'color',
    description: 'Module to generate colors.',
  },
  types: [
    {
      id: '0e0b4d4e-05bb-426c-be8c-b927da1edb3a',
      code: 'cmyk',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }]
      }
    },
    {
      id: '3d418ce7-0612-4558-8a7b-030273344f5b',
      code: 'colorByCSSColorSpace',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }, {
          name: 'space',
          type: 'select',
          value: 'sRGB',
          options: ['sRGB', 'display-p3', 'rec2020', 'a98-rgb', 'prophoto-rgb']
        }]
      }
    },
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
      id: 'bce7e3e1-84ee-4bc5-a4b8-125bba4c37b0',
      code: 'hsl',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }, {
          label: 'Adds an alpha value to the color (RGBA)',
          name: 'includeAlpha',
          type: 'boolean',
          value: false
        }]
      }
    },
    {
      id: '0f2626c6-b25e-4002-a39a-774b7144f15a',
      code: 'human',
      description: '',
    },
    {
      id: 'f4bef688-d57e-41a6-8201-057b3d0db4c3',
      code: 'hwb',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }],
      }
    },
    {
      id: '9095c489-0559-4014-aaf9-f5fc36cad9fa',
      code: 'lab',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }],
      }
    },
    {
      id: 'a0af3399-70c1-4270-a343-ec17e5fb0ad0',
      code: 'lch',
      description: '',
      settings: {
        options: [{
          name: 'format',
          type: 'string',
          value: 'css',
        }],
      }
    },
    {
      id: '31aa2aad-6641-41b0-bb39-43ea1891b4f0',
      code: 'rgb',
      description: '',
      settings: {
        options: [{
          label: 'Format of generated RGB color',
          name: 'format',
          type: 'select',
          value: 'css',
          options: ['css', 'hex', 'binary']
        }, {
          label: 'Letter type case of the generated hex color.',
          name: 'casing',
          type: 'select',
          value: 'lower',
          options: ['lower', 'upper']
        }, {
          label: 'Adds an alpha value to the color (RGBA)',
          name: 'includeAlpha',
          type: 'boolean',
          value: false,
        }]
      }
    },
    {
      id: 'c069be37-f483-4a47-a32e-deda7eb1b4a8',
      code: 'space',
      description: '',
    },
  ],
};