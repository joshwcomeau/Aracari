export const convertFromCents = value => (value / 100).toFixed(2);
export const convertToCents = value => Math.round(value * 100);

export const formatCurrency = (value, symbol = '$') => {
  let formattedValue = convertFromCents(value);

  if (symbol) {
    formattedValue = symbol + formattedValue;
  }

  return formattedValue;
};
