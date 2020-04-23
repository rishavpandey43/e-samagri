import {categoryList} from './constant';

export const filterProductBySeller = (sellerId, products) => {
  products = products.filter(product => product.seller === sellerId);
  return products;
};

export const filterOrderBySeller = (sellerId, orders) => {
  orders = orders.filter(order => order.orderedFrom === sellerId);
  return orders;
};

export const obtainItemsInString = (items, i) => {
  let orderName = ''.concat(
    items.map(item => {
      return item.name;
    }),
  );
  return orderName;
};

export const obtainAddressInString = addressObject => {
  let address = ' ';
  address += Object.keys(addressObject).map(key => addressObject[key] + ' ');
  return address;
};

export const getCategoryName = categoryValue => {
  let categoryName = categoryList.filter(
    category => category.value === categoryValue,
  )[0].name;
  return categoryName;
};

// TODO: complete this function
export const convertToPascalCase = () => {};
