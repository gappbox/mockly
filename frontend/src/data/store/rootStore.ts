import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '../utils/createSelectors';
import { templates } from '../constants';
import { Category, Field, Template, Type } from '../models';

type State = {
  categories: Category[];
  fields: Field[];
  templates: Template[];
  types: Record<string, Type[]>;
};

type Action = {
  appendField: (field: Field) => void;
  removeField: (field: Field) => void;
  removeFields: () => void;
  setCategories: (categories: Category[]) => void;
  setFields: (fields: Field[]) => void;
  setTypesForCategory: (category: string, types: Type[]) => void;
  updateField: (field: Field) => void;
  moveFieldUp: (id: string) => void;
  moveFieldDown: (id: string) => void;
};

const useRootStoreBase = create<State & Action>()(devtools((set) => ({
  categories: [],
  fields: [],
  templates,
  types: {},

  appendField: (field) => set((state) => ({
    fields: [...state.fields, field]
  })),

  removeField: (field) => set((state) => ({
    fields: state.fields.filter(({ id }) => id !== field.id),
  })),

  removeFields: () => set(() => ({
    fields: []
  })),

  setCategories: (categories) => set(() => ({
    categories,
  })),

  setFields: (fields) => set(() => ({
    fields,
  })),

  setTypesForCategory: (category, types) => set((state) => ({
    types: {...state.types, [category]: types},
  })),

  updateField: (field) => set((state) => ({
    fields: state.fields.map((f) => f.id === field.id ? field : f),
  })),

  moveFieldUp: (id) => set((state) => {
    const fields = [...state.fields];
    const index = state.fields.findIndex((field) => field.id === id);

    if (index > 0) {
      [fields[index - 1], fields[index]] = [fields[index], fields[index - 1]];
    }

    return { fields };
  }),

  moveFieldDown: (id) => set((state) => {
    const fields = [...state.fields];
    const index = state.fields.findIndex((field) => field.id === id);

    if (index < fields.length - 1) {
      [fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
    }

    return { fields };
  }),
})));

export const useRootStore = createSelectors(useRootStoreBase);