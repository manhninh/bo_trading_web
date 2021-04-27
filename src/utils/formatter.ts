const formatter2 = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const number2DecimalPlaces = (value) => {
  return Math.floor(value * 100000) / 100000;
};

export {formatter2, random, number2DecimalPlaces};
