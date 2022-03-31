
export const ShortNumber = (number:number) => {
  if (isNaN(number) || number === null || number === 0) {
    return 0;
  }
  let abs = Math.abs(number);
  const rounder = Math.pow(10, 1);
  const isNegative = number < 0;
  let key = '';
  const powers = [
    {key: 'Q', value: Math.pow(10, 15)},
    {key: 'T', value: Math.pow(10, 12)},
    {key: 'B', value: Math.pow(10, 9)},
    {key: 'M', value: Math.pow(10, 6)},
    {key: 'K', value: 1000}
  ];

  for (let i = 0; i < powers.length; i++) {
    let reduced = abs / powers[i].value;
    reduced = Math.round(reduced * rounder) / rounder;
    if (reduced >= 1) {
      abs = reduced;
      key = powers[i].key;
      break;
    }
  }
  return (isNegative ? '-' : '') + abs + key;
};

export const Currency = (number:number, locales = 'de-DE', factor = 0) => {
  return new Intl.NumberFormat(locales, {style: 'currency', currency: 'EUR'}).format(number * factor);
}

export const RandomScalingFactor = () => {
  return Math.floor(Math.random() * 100) + 1  ;
}
