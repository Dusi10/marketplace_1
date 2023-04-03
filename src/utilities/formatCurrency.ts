const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "HUF",
    style: "currency",
  });
  
  //For formating the prices to huf
  export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
  }
  