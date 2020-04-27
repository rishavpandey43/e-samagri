// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Header, Card, Text, Button, Image, Icon} from 'react-native-elements';

// * Import all store related stuffs
import * as CartActions from '../../store/actions/creators/CartActions';

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={
            <Icon
              type="font-awesome"
              name="arrow-left"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'Checkout',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        {!this.props.cart.cart || this.props.cart.cart.products.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/cart_empty.png')}
                style={{width: 250, height: 250}}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={{backgroundColor: 'red'}}
              />
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                Cart is empty, add your desired items to continue...
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text>Hello Checkout Me</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    width: '120%',
    height: 20,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    store: state.store,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...CartActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutScreen);
