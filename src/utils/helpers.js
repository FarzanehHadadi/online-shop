export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 3,
  }).format(price / 100);
};

export const getUniqueValues = () => {};
