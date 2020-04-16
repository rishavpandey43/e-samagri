import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Header, Icon} from 'react-native-elements';

class AddNewProductScreen extends Component {
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
          <Text>AddNewProduct Screen</Text>
        </View>
      </ScrollView>
    );
  }
}

export default AddNewProductScreen;
