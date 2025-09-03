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
      id: 'a2488cd8-24a4-4cfd-a435-520fc603981d',
      code: 'flightNumber',
      description: '',
    },
    {
      id: '3193fb7f-dce8-4e98-982f-7654c022f3c2',
      code: 'recordLocator',
      description: '',
    },
    {
      id: '74572cb8-091f-4ccf-8d28-c0ab3b40c1f1',
      code: 'seat',
      description: '',
    },
  ],
};