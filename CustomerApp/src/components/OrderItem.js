// * Import required modules/dependencies
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const Item = ({name, variant, quantity, price}) => {
  return (
    <View
      style={[
        mainStyles.row,
        {
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#cacaca',
          paddingBottom: 15,
        },
      ]}>
      <View style={[mainStyles.col4]}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <Text style={{color: '#aaaaaa'}}>{variant}</Text>
      </View>
      <View style={[mainStyles.col4]}>
        <Text style={{textAlign: 'right'}}>Qty: {quantity}</Text>
      </View>
      <View style={[mainStyles.col4]}>
        <Text style={{textAlign: 'right'}}>₹ {price}</Text>
      </View>
    </View>
  );
};
export default Item;
