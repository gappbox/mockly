import { httpRequest } from '../utils/httpRequest';
import { Category, Field, Type } from '../models';

const baseURL = import.meta.env.VITE_BASE_URL

export const fetchCategories = async (): Promise<Category[]> => {
  return httpRequest(`${baseURL}/api/categories`);
};

export const fetchTypesByCategory = async (category: string): Promise<Type[]> => {
  return httpRequest(`${baseURL}/api/categories/${category}/types`);
};

export const generateMockData = async (items: Field[], count = 100): Promise<any[]> => {
  return httpRequest(`${baseURL}/api/mocks`, {
    body: JSON.stringify({ items, count }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};