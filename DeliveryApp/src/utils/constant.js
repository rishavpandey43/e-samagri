export const baseUrl = 'https://e-samagri-backend.herokuapp.com';
// export const baseUrl = 'http://192.168.43.240:5555';

export const authTokenName = 'eSamagri_delivery_auth_token';

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
