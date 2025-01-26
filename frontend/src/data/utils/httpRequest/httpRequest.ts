export const httpRequest = async (url: string, options?: RequestInit): Promise<any> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));

    const error: any = new Error(errorData.message || response.statusText);

    error.status = response.status;
    error.data = errorData;

    throw error;
  }

  return response.json();
};