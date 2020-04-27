// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Header, Card, Text, Button, Image, Icon} from 'react-native-elements';

// * Import all store related stuffs
import * as CartActions from '../../store/actions/creators/CartActions';

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedCart: null,
      totalProducts: this.props.cart.cart
        ? this.props.cart.cart.products.length > 0
          ? this.props.cart.cart.products.reduce((acc, cur) => ({
              quantity: acc.quantity + cur.quantity,
            })).quantity
          : 0
        : 0,
    };
  }

  componentDidMount() {}

  render() {
    console.log(this.state.totalProducts);
    const ItemCard = () => {
      return (
        <Card>
          <View style={mainStyles.row}>
            <View style={mainStyles.col5}>
              <Image
                source={{uri: 'https://via.placeholder.com/100'}}
                style={{width: 100, height: 100}}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={mainStyles.col7}>
              <View style={mainStyles.row}>
                <View style={mainStyles.col9}>
                  <Text>Kurkure Masala Munch</Text>
                  <Text style={{marginTop: 15}}>₹ 20 / 90 gm</Text>
                </View>
                <View style={[mainStyles.col3, {justifyContent: 'center'}]}>
                  <Text style={{textAlign: 'center'}}>₹ 20</Text>
                </View>
              </View>

              <View style={[mainStyles.row, {marginTop: 15}]}>
                <View style={mainStyles.col4}>
                  <Button type="outline" buttonStyle={styles.btn} title="-" />
                </View>
                <View
                  style={[
                    mainStyles.col4,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text>1</Text>
                </View>
                <View style={mainStyles.col4}>
                  <Button type="outline" buttonStyle={styles.btn} title="+" />
                </View>
              </View>
            </View>
          </View>
        </Card>
      );
    };

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
            text: 'Your Cart',
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
          <View style={{flexDirection: 'column', height: '100%'}}>
            <View style={{flex: 2, height: '100%'}}>
              <ScrollView>
                <View style={mainStyles.row}>
                  <ItemCard />
                  <ItemCard />
                  <ItemCard />
                  <ItemCard />
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: '#fff',
                padding: 10,
              }}>
              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Items Total Price:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>₹ 65</Text>
                </View>
              </View>
              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Delivery Charge:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>₹ 65</Text>
                </View>
              </View>
              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Final Amount:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>₹ 130</Text>
                </View>
              </View>

              <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                <Button
                  title="Checkout"
                  buttonStyle={{
                    width: 150,
                    borderRadius: 20,
                    backgroundColor: variables.mainThemeColor,
                  }}
                />
              </View>
            </View>
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
)(CartScreen);
