// export const baseUrl = 'https://e-samagri-backend.herokuapp.com';
export const baseUrl = 'http://192.168.43.240:5555';

export const authTokenName = 'eSamagri_customer_auth_token';

export const addressType = [
  {
    name: 'Home',
    value: 'home',
    icon: 'home',
  },
  {
    name: 'Work',
    value: 'work',
    icon: 'briefcase',
  },
  {
    name: 'Other',
    value: 'other',
    icon: 'map-marker',
  },
];

export const categoryList = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Kitchen Staples',
    value: 'ks',
  },
  {
    name: 'Coffee, Tea & Beverages',
    value: 'bs',
  },
  {
    name: 'Dried Fruits, Nuts & Seeds',
    value: 'dfns',
  },
  {
    name: 'Packed Foods',
    value: 'pf',
  },
  {
    name: 'Snacks & Cookies',
    value: 'sc',
  },
  {
    name: 'Dairy Products',
    value: 'dp',
  },
  {
    name: 'Bakery & Cakes',
    value: 'bc',
  },
  {
    name: 'Personal & Homecare',
    value: 'ph',
  },
  {
    name: 'Health & Wellness',
    value: 'hw',
  },
];

export const paymentMode = [
  {
    name: 'Cash on Delivery',
    value: 'cod',
  },
  {
    name: 'Online',
    value: 'online',
  },
];

export const orderStatus = [
  {
    name: 'Pending',
    value: 'pen',
    color: 'orange',
  },
  {
    name: 'Processing',
    value: 'prc',
    color: 'blue',
  },
  {
    name: 'Processed',
    value: 'prcd',
    color: '#EE82EE',
  },
  {
    name: 'Out For Delivery',
    value: 'ofd',
    color: 'yellow',
  },
  {
    name: 'Delivered',
    value: 'del',
    color: 'green',
  },
  {
    name: 'Cancelled',
    value: 'can',
    color: 'red',
  },
];
