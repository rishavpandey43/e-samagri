import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  VirtualizedList,
  SafeAreaView,
} from 'react-native';
import {Header, Card, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actionCreators from '../store/actions/creators/GetOrders';

import variables from '../styles/variables';
import mainStyles from '../styles/mainStyle';

import * as helper from '../utils/helper';

class AddNewProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'ADD NEW PRODUCT',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View>
            <Text>Add New Product Screen</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AddNewProductScreen;
