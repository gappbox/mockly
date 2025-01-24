export const createJson = (value: unknown): string => {
  return JSON.stringify(value, null, 2);
};