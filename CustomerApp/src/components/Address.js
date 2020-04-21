import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const Address = ({type, value}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
        paddingBottom: 15,
      }}>
      <View style={mainStyles.row}>
        <View
          style={[
            mainStyles.col3,
            mainStyles.alignCenter,
            mainStyles.justifyContentCenter,
          ]}>
          <Icon name="home" color={variables.mainThemeColor} size={20} />
        </View>
        <View style={mainStyles.col9}>
          <Text style={styles.label}>{type}</Text>
        </View>
      </View>
      <View style={[mainStyles.col9, {marginLeft: 'auto'}]}>
        <Text style={styles.content}>{value}</Text>
      </View>
      <View style={[mainStyles.col9, {marginLeft: 'auto'}]}>
        <View style={[mainStyles.row, {marginTop: 15}]}>
          <View style={mainStyles.col6}>
            <Button
              type="outline"
              titleStyle={{color: variables.mainThemeColor}}
              title="Edit"
            />
          </View>
          <View style={mainStyles.col6}>
            <Button
              type="outline"
              titleStyle={{color: variables.mainThemeColor}}
              title="Delete"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
  },
  content: {
    marginTop: 10,
    fontSize: 15,
  },
  btn: {
    // backgroundColor: variables.mainThemeColor,
  },
});

export default Address;
