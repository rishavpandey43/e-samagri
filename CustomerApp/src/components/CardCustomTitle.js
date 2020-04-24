import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const CardCustomTitle = ({title, detail, type, onPress}) => {
  const [customIconName, setCustomIconName] = useState('arrow-right');

  return (
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
          name={`${type === 'edit' ? 'pencil' : customIconName}`}
          type="font-awesome"
          size={25}
          color={variables.mainThemeColor}
          onPress={() => {
            if (type !== 'edit') {
              setCustomIconName(
                customIconName === 'arrow-right' ? 'arrow-down' : 'arrow-right',
              );
            }
            onPress();
          }}
        />
      </View>
    </View>
  );
};

export default CardCustomTitle;
