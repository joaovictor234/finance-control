export const formatMoneyToBRL = (value: number) => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export const formatMoneyBRLToNumber = (value: string) => {
  return parseFloat(value.replace(/\D/g, ''))/100;
}