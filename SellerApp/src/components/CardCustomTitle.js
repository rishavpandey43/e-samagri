import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const CardCustomTitle = ({title, detail, onPress}) => (
  <View style={mainStyles.row}>
    <View style={mainStyles.col6}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
    </View>
    <View
      style={[
        mainStyles.col6,
        {
          alignItems: 'flex-end',
          justifyContent: 'center',
          display: `${detail ? 'flex' : 'none'}`,
          padding: 10,
        },
      ]}>
      <Icon
        name="pencil"
        size={25}
        color={variables.mainThemeColor}
        onPress={() => {
          onPress();
        }}
      />
    </View>
  </View>
);

export default CardCustomTitle;
