export const formatToBRL = (value: number) => {
  return (
    "R$ " +
    Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(value)
  );
};
