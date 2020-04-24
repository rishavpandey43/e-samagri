import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {Icon, CheckBox} from 'react-native-elements';

import {getAddress} from '../utils/helper';

import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const Address = ({type, value, isDefault, edit}) => {
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
          <Icon
            name={getAddress(type).icon}
            type="font-awesome"
            color={variables.mainThemeColor}
            size={20}
          />
        </View>
        <View style={mainStyles.col9}>
          <Text style={styles.label}>{getAddress(type).name}</Text>
        </View>
      </View>
      <View style={[mainStyles.col9, {marginLeft: 'auto'}]}>
        <Text style={styles.content}>{value}</Text>
      </View>
      {edit ? (
        <View style={[mainStyles.col9, {marginLeft: 'auto'}]}>
          <View style={[mainStyles.row, {marginTop: 15}]}>
            <View style={mainStyles.col6}>
              <Button
                title="Edit"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
              />
            </View>
            <View style={mainStyles.col6}>
              <Button
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                title="Delete"
                buttonStyle={mainStyles.outlineBtn}
              />
            </View>
          </View>
        </View>
      ) : isDefault ? (
        <View style={[mainStyles.col9, {marginLeft: 'auto'}]}>
          <Text style={[{marginTop: 10, fontSize: 18, color: 'green'}]}>
            Default
          </Text>
        </View>
      ) : (
        <CheckBox
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          center
          iconRight
          title="Set Default"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={false}
          onPress={() => {}}
        />
      )}
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
