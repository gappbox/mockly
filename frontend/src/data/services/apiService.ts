import { httpRequest } from '../utils/httpRequest';
import { Category, Field, Type } from '../models';

const baseURL = import.meta.env.VITE_BASE_URL

export const fetchCategories = async (): Promise<Category[]> => {
  return httpRequest(`${baseURL}/api/dataset/categories`);
};

export const fetchTypesByCategory = async (category: string): Promise<Type[]> => {
  return httpRequest(`${baseURL}/api/dataset/categories/${category}/types`);
};

export const generateMockData = async (items: Field[], count = 100): Promise<any[]> => {
  return httpRequest(`${baseURL}/api/dataset`, {
    body: JSON.stringify({ items, count }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

export const generateSingleMockData = async (category: string, type: string): Promise<any> => {
  return httpRequest(`${baseURL}/api/data`, {
    body: JSON.stringify({ category, type }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};