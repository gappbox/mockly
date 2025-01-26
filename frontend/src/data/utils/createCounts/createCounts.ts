export const createCounts = () => {
  return [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000].map((count) => {
    return {
      label: count,
      value: count,
    };
  });
}