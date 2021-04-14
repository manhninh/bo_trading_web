const formatter2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export { formatter2, random };

