import React, {Component} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import {Header, Icon} from 'react-native-elements';

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <Header
          leftComponent={
            <Button
              title="go back"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Product Detail Screen</Text>
        </View>
      </ScrollView>
    );
  }
}

export default ProductDetailScreen;
