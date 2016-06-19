export const formatCurrency = (value, symbol = '$') => {
  let formattedValue = (value / 100).toFixed(2);

  if (symbol) {
    formattedValue = symbol + formattedValue;
  }

  return formattedValue;
}
