import AsyncStorage from '@react-native-community/async-storage';

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
  return (
    categoryList.filter(category => category.value === categoryValue)[0].name ||
    '-'
  );
};

export const storeDataInAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

export const getDataFromAsync = async key => {
  let value = '';
  try {
    value = (await AsyncStorage.getItem(key)) || null;
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const removeDataFromAsync = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

// TODO: complete this function
export const convertToPascalCase = () => {};
