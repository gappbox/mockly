import { useState } from 'react';
import { useRootStore } from '../store';
import { useNotification } from './useNotification';
import { fetchCategories, fetchTypesByCategory } from '../services';
import { ResponseError } from '../models';

export const useEntities = () => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const notify = useNotification();
  const appendField = useRootStore.use.appendField();
  const categories = useRootStore.use.categories();
  const types = useRootStore.use.types();
  const setCategories = useRootStore.use.setCategories();
  const setTypesForCategory = useRootStore.use.setTypesForCategory();
  const updateField = useRootStore.use.updateField();

  const loadCategories = async (): Promise<void> => {
    if (!categories.length) {
      setLoadingCategories(true);

      try {
        const response = await fetchCategories();

        setCategories(response);
        setLoadingCategories(false);
      } catch (error) {
        setLoadingCategories(false);
        notify.error((error as ResponseError).data.errorMessage);
      }
    }
  };

  const loadTypeForCategory = async (category: string): Promise<void> => {
    if (!types[category]) {
      setLoadingTypes(true);

      try {
        const response = await fetchTypesByCategory(category);

        setTypesForCategory(category, response);
        setLoadingTypes(false);
      } catch (error) {
        setLoadingTypes(false);
        notify.error((error as ResponseError).data.errorMessage);
      }
    }
  };

  return {
    loadingCategories,
    loadingTypes,
    types,
    categories,
    appendField,
    updateField,
    loadCategories,
    loadTypeForCategory,
  };
};