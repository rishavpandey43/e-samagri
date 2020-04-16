import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Products Screen</Text>
        <Button
          title="See Product"
          onPress={() => this.props.navigation.navigate('Product Detail')}
        />
      </View>
    );
  }
}

export default ProductsScreen;
