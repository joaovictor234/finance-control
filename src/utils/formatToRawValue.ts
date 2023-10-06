export const formatToRawValue = (value: string): number => {
  return +value.replace(/\D/g, "") / 100;
};
