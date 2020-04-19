import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../styles/mainStyle';

class WishListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="bars"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'My Wishlist',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="heart" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={[mainStyles.container, {marginBottom: 100}]}>
            <Text>I'm WishList Screen</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default WishListScreen;
