import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Header, Icon} from 'react-native-elements';

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <Header
          leftComponent={{icon: 'home', color: '#fff'}}
          centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Order Detail Screen</Text>
        </View>
      </ScrollView>
    );
  }
}

export default OrderDetailScreen;
