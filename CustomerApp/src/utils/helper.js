import {addressType} from './constant';

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

export const getCategoryName = categoryValue => {
  let categoryName = categoryList.filter(
    category => category.value === categoryValue,
  )[0].name;
  return categoryName;
};

export const getAddress = type => {
  let address = addressType.filter(address => address.value === type)[0];
  return address;
};

export const addressInString = address => {
  let addressString = '';
  for (const key in address) {
    if (key != 'type') {
      addressString += address[key] + ', ';
    }
  }
  return addressString;
};

// TODO: complete this function
export const convertToPascalCase = () => {};
