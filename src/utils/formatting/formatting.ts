export const formatEuro = (amount: number) => {
  const euro = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  return euro.format(amount);
};

export const formatLitre = (amount: number) => {
  const liter = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "liter",
    unitDisplay: "long",
  });
  return liter.format(amount);
};

export const formatKM = (amount: number) => {
  const km = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  });
  return km.format(amount);
};

export const formatEurPerLitre = (amount: number) => {
  const numberWithCurrency = amount.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  const units = amount
    .toLocaleString("de-DE", {
      style: "unit",
      unit: "liter",
      unitDisplay: "narrow",
    })
    .split(/\s+/)
    .pop();
  return `${numberWithCurrency}/${units}`;
};

export const formatDate = (date: Date | number) => {
  const dateFormater = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return dateFormater.format(date);
};
