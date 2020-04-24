import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Card,
  Text,
  Button,
  Image,
  SearchBar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../styles/mainStyle';

const Store = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('store-screen');
      }}>
      <View style={[mainStyles.row, {marginTop: 10, marginBottom: 10}]}>
        <View style={mainStyles.col4}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={{width: 100, height: 100}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={mainStyles.col8}>
          <Text style={{fontSize: 18}}>Sellet Store 1</Text>
          <Text style={{color: '#555'}}>
            Dummy Address, ksbc,1234, dto, In, 822112
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Store;
