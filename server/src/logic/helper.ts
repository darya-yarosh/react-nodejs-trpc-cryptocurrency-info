export function formatVolumeUsd24Hr(volumeUsd24Hr: number) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(volumeUsd24Hr);
  }
  
  export function formatPercent(persent: number) {
    const percentDecimalStr = String(persent).split(".");
  
    let nonZeroIndex = 0;
    let currentNum = "0";
    while (currentNum === "0") {
      currentNum = String(percentDecimalStr[1])[nonZeroIndex];
      nonZeroIndex++;
    }
  
    return nonZeroIndex <= 2
      ? new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(persent / 100)
      : new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: nonZeroIndex + 3,
        maximumFractionDigits: nonZeroIndex + 3,
      }).format(persent / 100);
  }

  export function formatMarketCap(marketCap: number) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(marketCap);
  }

  export function formatPrice(price: number) {
    const priceDecimalStr = String(price).split(".");
  
    let nonZeroIndex = 0;
    let currentNum = "0";
    while (currentNum === "0") {
      currentNum = String(priceDecimalStr[1])[nonZeroIndex];
      nonZeroIndex++;
    }
  
    return nonZeroIndex < 2
      ? new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
      : new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: nonZeroIndex + 3,
        maximumFractionDigits: nonZeroIndex + 3,
      }).format(price);
  }
  
  export function formatSupply(supply: number, symbol: string) {
    const value = supply === null ? Infinity : supply;
    
    return (
      new Intl.NumberFormat("en", {
        maximumFractionDigits: 0,
      }).format(value) +
      " " +
      symbol
    );
  }