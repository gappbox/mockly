import { useState } from 'react';
import { useNotification } from './useNotification';
import { generateMockData } from '../services';
import { Field, ResponseError } from '../models';

export const useMockDataGenerator = () => {
  const notify = useNotification();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const generateData = async (fields: Field[], count: number): Promise<void> => {
    setLoading(true);

    try {
      const response = await generateMockData(fields, count);

      setLoading(false);
      setData(response);
    } catch (error) {
      setLoading(false);
      notify.error((error as ResponseError).data.errorMessage);
    }
  };

  const clearData = (): void => {
    setData(null);
  };

  return {
    data,
    loading,
    clearData,
    generateData,
  };
};