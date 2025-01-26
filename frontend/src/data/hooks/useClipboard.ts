import { useNotification } from './useNotification';

export const useClipboard = () => {
  const notify = useNotification();

  const writeText = async (data: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(data);
      notify.success('Copied to clipboard');
    } catch (error) {
      notify.error(`'Error copying text to clipboard: ${error}'`);
    }
  };

  return {
    writeText,
  };
};