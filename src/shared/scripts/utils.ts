export const countTrue = (...booleans: boolean[]): number => {
  return booleans.filter((it) => it).length;
};

export const padNum = (num: number): string => {
  return String(num).padStart(2, "0");
};
