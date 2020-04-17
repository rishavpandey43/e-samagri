export const filterBySeller = (sellerId, products) => {
  products = products.filter(product => product.seller === sellerId);
  return products;
};
