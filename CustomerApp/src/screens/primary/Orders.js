// * Import required modules/dependencies
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components
import OrderCard from '../../components/OrderCard';

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';

class OrdersScreen extends Component {
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
              type="font-awesome"
              name="bars"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'Your Orders History',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              type="font-awesome"
              name="shopping-basket"
              color="#FFF"
              size={25}
              onPress={() => {
                this.props.navigation.navigate('cart-screen');
              }}
            />
          }
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={[mainStyles.container, {marginBottom: 100}]}>
            <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default OrdersScreen;
