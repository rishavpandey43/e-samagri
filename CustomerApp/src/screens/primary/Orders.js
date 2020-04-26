// * Import required modules/dependencies
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          rightComponent={<Icon name="history" color="#FFF" size={30} />}
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
