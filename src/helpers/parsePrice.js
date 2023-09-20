export function parsePrice(inputString) {
  const numberString = inputString.replace(/[^0-9.]/g, '');
  const number = parseFloat(numberString);
  return number;
}



