export const baseUrl = 'http://192.168.43.240:5555';
// export const baseUrl = 'https://e-samagri-backend.herokuapp.com';

export const authTokenName = 'eSamagri_seller_auth_token';

export const verificationDocumentType = [
  {
    name: 'Aadhar Card',
    value: 'aadhar-id',
  },
  {
    name: 'Voter ID Card',
    value: 'voter-id',
  },
];

export const shopType = [
  {
    label: 'General Store',
    value: 0,
  },
  {
    label: 'Liquor Shop',
    value: 1,
  },
];

export const productCategoryList = [
  {
    shopType: 0,
    categories: [
      {
        label: '-',
        value: '',
      },
      {
        label: 'Kitchen Staples',
        value: 0,
      },
      {
        label: 'Coffee, Tea & Beverages',
        value: 1,
      },
      {
        label: 'Dried Fruits, Nuts & Seeds',
        value: 2,
      },
      {
        label: 'Packed Foods',
        value: 3,
      },
      {
        label: 'Snacks & Cookies',
        value: 4,
      },
      {
        label: 'Dairy Products',
        value: 5,
      },
      {
        label: 'Bakery & Cakes',
        value: 6,
      },
      {
        label: 'Personal & Homecare',
        value: 7,
      },
      {
        label: 'Health & Wellness',
        value: 8,
      },
    ],
  },
  {
    shopType: 1,
    categories: [
      {
        label: '-',
        value: '',
      },
      {
        label: 'Beer',
        value: 0,
      },
      {
        label: 'Vodka',
        value: 1,
      },
      {
        label: 'Whiskey',
        value: 2,
      },
      {
        label: 'Rum',
        value: 3,
      },
      {
        label: 'Brandy',
        value: 4,
      },
      {
        label: 'Wine',
        value: 5,
      },
      {
        label: 'Tequila',
        value: 6,
      },
      {
        label: 'Desi Daru',
        value: 7,
      },
    ],
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
    label: 'All',
    value: 'all',
    color: '-',
  },
  {
    label: 'Pending',
    value: 'pen',
    color: 'orange',
  },
  {
    label: 'Processing',
    value: 'prc',
    color: 'blue',
  },
  {
    label: 'Processed',
    value: 'prcd',
    color: '#EE82EE',
  },
  {
    label: 'Out For Delivery',
    value: 'ofd',
    color: '#FF1493',
  },
  {
    label: 'Delivered',
    value: 'del',
    color: 'green',
  },
  {
    label: 'Cancelled',
    value: 'can',
    color: 'red',
  },
];

export const verificationStatus = [
  {
    label: 'Pending',
    value: 'pen',
    color: 'orange',
  },
  {
    label: 'Verified',
    value: 'ver',
    color: 'green',
  },
  {
    label: 'Rejected',
    value: 'rej',
    color: 'red',
  },
];
