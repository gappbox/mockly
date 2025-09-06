import type { Schema } from '../models';

export const airlineSchema: Schema = {
  category: {
    id: 'd21d1301-1e38-4fab-aee8-1ddc501879c9',
    code: 'airline',
    description: 'Module to generate airline and airport related data.',
  },
  types: [
    {
      id: '51914275-d220-4772-a58b-bcf96154387f',
      code: 'aircraftType',
      description: '',
    },
    {
      id: 'e4f04271-0dc8-4cd4-8519-30756603698c',
      code: 'airline',
      description: '',
      settings: {
        extraction: {
          value: 'name',
          options: ['name', 'iataCode']
        }
      }
    },
    {
      id: 'fca68def-e23a-4049-b8c3-8a0a1b7ca52c',
      code: 'airplane',
      description: '',
      settings: {
        extraction: {
          value: 'name',
          options: ['name', 'iataTypeCode']
        }
      }
    },
    {
      id: '70005452-754b-4d93-aa67-57fb336ddaaa',
      code: 'airport',
      description: '',
      settings: {
        extraction: {
          value: 'name',
          options: ['name', 'iataCode']
        }
      }
    },
    {
      id: 'a2488cd8-24a4-4cfd-a435-520fc603981d',
      code: 'flightNumber',
      description: '',
      settings: {
        options: [{
          name: 'length',
          type: 'number',
          value: 4,
        },{
          label: 'Whether to pad the flight number up to 4 digits with leading zeros.',
          name: 'addLeadingZeros',
          type: 'boolean',
          value: false,
        }],
      }
    },
    {
      id: '3193fb7f-dce8-4e98-982f-7654c022f3c2',
      code: 'recordLocator',
      description: '',
      settings: {
        options: [{
          label: 'Whether to allow numeric character',
          name: 'allowNumerics',
          type: 'boolean',
          value: false,
        },{
          label: 'Whether to allow visually similar characters such as \'1\' and \'I\'.',
          name: 'allowVisuallySimilarCharacters',
          type: 'boolean',
          value: false,
        }],
      },
    },
    {
      id: '74572cb8-091f-4ccf-8d28-c0ab3b40c1f1',
      code: 'seat',
      description: '',
      settings: {
        options: [{
          name: 'aircraftType',
          type: 'select',
          value: 'narrowbody',
          options: ['narrowbody', 'regional', 'widebody']
        }],
      },
    },
  ],
};