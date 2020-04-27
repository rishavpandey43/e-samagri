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
import {Picker} from '@react-native-community/picker';

// * Import all store related stuffs
import * as HomeActions from '../../store/actions/creators/HomeActions';
import * as CartActions from '../../store/actions/creators/CartActions';

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedVariant: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params.productId) {
      let tempProduct = this.props.store.store.products.filter(
        product => product._id === this.props.route.params.productId,
      )[0];
      this.setState({
        product: tempProduct,
        selectedVariant: {
          productId: tempProduct._id,
          variantId: tempProduct.variants[0]._id,
          value: tempProduct.variants[0].value,
        },
      });
    }
  }

  addToCart = () => {
    let cart = {
      storeId: this.props.store.store._id,
      products: [
        {
          id: this.state.product._id,
          variantId: this.state.selectedVariant.variantId,
          quantity: 1,
        },
      ],
    };
    console.log(cart, this.props.cart.cart);
    // * Check if the cart is empty to add first product
    if (!this.props.cart.cart) {
      this.props.updateCartToServerFetch('new', cart);
    }
    // * Confirm to user, if he tries to add product from another store to cart
    else if (this.props.cart.cart.storeId !== this.props.store.store._id) {
      Alert.alert(
        'Store change',
        "You're about to change the store. You can't select products from multiple store in single order.",
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this.props.updateCartToServerFetch('new', cart),
          },
        ],
      );
    }
    // * Here, when user add product from same store to cart
    else if (this.props.cart.cart.storeId === this.props.store.store._id) {
      // * check if the there is no product in cart
      let productInCart = this.props.cart.cart.products.filter(
        product => product.id === cart.products[0].id,
      )[0];

      if (productInCart) {
        // * check for product with same variant in the cart, because if it's added ADD TO CART button will not be displayed
        let productIndexInCart = null;
        this.props.cart.cart.products.forEach((product, index) => {
          if (
            product.id === cart.products[0].id &&
            product.variantId === cart.products[0].variantId
          ) {
            productIndexInCart = index;
            return;
          }
        });

        // * If the product is same with different variant, then add it as new product in cart
        if (productIndexInCart === null) {
          let tempCart = {
            ...this.props.cart.cart,
          };
          tempCart.products.push(cart.products[0]);
          this.props.updateCartToServerFetch('new', tempCart);
          return;
        }
      }
      // * If there is new product to be added, add to cart
      else if (!productInCart) {
        let tempCart = {
          ...this.props.cart.cart,
        };
        tempCart.products.push(cart.products[0]);
        this.props.updateCartToServerFetch('new', tempCart);
        return;
      }
    }
  };

  changeProductQuantityinCart = type => {
    let tempCart = {
      ...this.props.cart.cart,
    };
    let productIndexInCart = null;
    this.props.cart.cart.products.forEach((product, index) => {
      if (
        product.id === this.state.selectedVariant.productId &&
        product.variantId === this.state.selectedVariant.variantId
      ) {
        productIndexInCart = index;
        return;
      }
    });
    if (type === 'increment') {
      tempCart.products[productIndexInCart].quantity++;
      if (tempCart.products[productIndexInCart].quantity > 5) {
        Alert.alert(
          'Product quantity exceeding the limit',
          'You cannot add more than 5 same products for now!',
          [
            {
              text: 'OK',
              onPress: () => {
                tempCart.products[productIndexInCart].quantity--;
                this.props.updateCartToServerFetch('change', tempCart);
                return;
              },
            },
          ],
        );
        return;
      } else {
        this.props.updateCartToServerFetch('change', tempCart);
      }
    } else if (type === 'decrement') {
      tempCart.products[productIndexInCart].quantity--;
      if (tempCart.products[productIndexInCart].quantity === 0) {
        tempCart.products.splice(productIndexInCart, 1);
        this.props.updateCartToServerFetch('change', tempCart);
      } else {
        this.props.updateCartToServerFetch('change', tempCart);
      }
    } else return;
  };

  render() {
    return (
      <View>
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
            text: this.state.product ? this.state.product.root.name : '',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              type="font-awesome"
              name="shopping-basket"
              size={20}
              color="#FFF"
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
          <View style={mainStyles.container}>
            {!this.state.product ? (
              <Card
                title="Error Message"
                containerStyle={{alignItems: 'center'}}>
                <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                  Some error occured, go back
                </Text>
                <Button
                  title="Go back"
                  type="outline"
                  titleStyle={{color: variables.mainThemeColor}}
                  buttonStyle={mainStyles.outlineBtn}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                />
              </Card>
            ) : (
              <View>
                <Card>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={{uri: 'https://via.placeholder.com/200'}}
                      style={{width: 200, height: 200}}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  </View>
                  <View style={{marginTop: 20}}>
                    <View>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {this.state.product.root.name}
                      </Text>
                    </View>
                    <View style={mainStyles.row}>
                      <View style={mainStyles.col7}>
                        <Picker
                          selectedValue={this.state.selectedVariant.value}
                          style={{height: 40, width: 'auto', marginTop: 10}}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                              selectedVariant: {
                                ...this.state.selectedVariant,
                                value: itemValue,
                                variantId: this.state.product.variants[
                                  itemIndex
                                ]._id,
                              },
                            });
                          }}>
                          {this.state.product.variants.map((variant, index) => (
                            <Picker.Item
                              key={index}
                              label={`${variant.value}/₹ ${variant.price}`}
                              value={variant.value}
                            />
                          ))}
                        </Picker>
                      </View>
                      <View
                        style={[mainStyles.col5, {justifyContent: 'center'}]}>
                        {this.props.cart.cart ? (
                          !this.props.cart.cart.products.filter(
                            cartProduct =>
                              cartProduct.variantId ===
                              this.state.selectedVariant.variantId,
                          )[0] ? (
                            <View style={{alignItems: 'center'}}>
                              <Button
                                type="outline"
                                buttonStyle={styles.btn}
                                title="Add to cart"
                                onPress={this.addToCart.bind(null)}
                                titleStyle={{
                                  color: variables.mainThemeColor,
                                }}
                              />
                            </View>
                          ) : (
                            <View style={[mainStyles.row, {marginTop: 15}]}>
                              <View style={{flex: 1}}>
                                <Button
                                  type="outline"
                                  buttonStyle={[styles.btn, {padding: 2}]}
                                  title="-"
                                  onPress={this.changeProductQuantityinCart.bind(
                                    null,
                                    'decrement',
                                  )}
                                  titleStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: variables.mainThemeColor,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text style={{fontSize: 18}}>
                                  {
                                    this.props.cart.cart.products.filter(
                                      cartProduct =>
                                        cartProduct.variantId ===
                                        this.state.selectedVariant.variantId,
                                    )[0].quantity
                                  }
                                </Text>
                              </View>
                              <View style={{flex: 1}}>
                                <Button
                                  type="outline"
                                  buttonStyle={[styles.btn, {padding: 2}]}
                                  title="+"
                                  onPress={this.changeProductQuantityinCart.bind(
                                    null,
                                    'increment',
                                  )}
                                  titleStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: variables.mainThemeColor,
                                  }}
                                />
                              </View>
                            </View>
                          )
                        ) : (
                          <View>
                            <Button
                              type="outline"
                              buttonStyle={styles.btn}
                              title="Add to cart"
                              onPress={this.addToCart.bind(null)}
                              titleStyle={{color: variables.mainThemeColor}}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </Card>

                <Card title="Product Description">
                  <Text>Dummy Description</Text>
                </Card>
              </View>
            )}
          </View>
        </ScrollView>
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
    borderRadius: 5,
    borderColor: variables.mainThemeColor,
  },
});

const mapStateToProps = state => {
  return {
    store: state.store,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...HomeActions, ...CartActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
