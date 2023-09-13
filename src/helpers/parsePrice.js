export function parsePrice(priceString) {
    return parseFloat(priceString.replace('$', ''));
  };