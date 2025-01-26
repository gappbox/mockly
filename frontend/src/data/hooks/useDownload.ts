export const useDownload = () => {
  const download = (data: string, filename = 'data.json'): void => {
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    download,
  };
};