// * Import required modules/dependencies
import AsyncStorage from '@react-native-community/async-storage';

// * Import utilites
import {
  addressType,
  productCategoryList,
  orderStatus,
  paymentMode,
  verificationDocumentType,
  verificationStatus,
  shopType,
} from './constant';

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

export const filterProductBySeller = (sellerId, products) => {
  products = products.filter(product => product.seller === sellerId);
  return products;
};

export const filterOrderBySeller = (sellerId, orders) => {
  orders = orders.filter(order => order.orderedFrom === sellerId);
  return orders;
};

export const getVerificationDocumentName = documentValue => {
  return (
    verificationDocumentType.filter(
      document => document.value === documentValue,
    )[0].name || '-'
  );
};

export const getVerificationStatus = type => {
  return verificationStatus.filter(
    verification => verification.value === type,
  )[0];
};

export const getShopType = type => {
  return shopType.filter(shopType => shopType.value === type)[0].label;
};

export const obtainItemsInString = (items, i) => {
  let orderName = ''.concat(
    items.map(item => {
      return item.name;
    }),
  );
  return orderName;
};

export const getCategoryName = (shopType, categoryValue) => {
  let category = productCategoryList
    .filter(shopCategory => shopCategory.shopType === shopType)[0]
    .categories.filter(
      productCategory => productCategory.value === categoryValue,
    )[0];
  return category;
};

export const getStoreCategory = (shopType, products) => {
  let categoryList = ['all']; // add all by default
  products.map(product => {
    if (categoryList.indexOf(product.root.category) === -1) {
      categoryList.push(product.root.category);
    }
  });
  return categoryList.map(category => getCategoryName(shopType, category));
};

export const getAddress = type => {
  let address = addressType.filter(address => address.value === type)[0];
  return address;
};

export const obtainAddressInString = address => {
  let addressString = '';
  for (const key in address) {
    if (key != 'type') {
      addressString += address[key] + ', ';
    }
  }
  return addressString;
};

export const getOrderStatus = type => {
  return orderStatus.filter(status => status.value === type)[0];
};

export const getpaymentMode = type => {
  return paymentMode.filter(payment => payment.value === type)[0].name;
};

// TODO: complete this function
export const convertToPascalCase = () => {};
