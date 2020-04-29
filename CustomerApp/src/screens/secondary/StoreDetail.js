// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Header,
  Card,
  Text,
  Button,
  Image,
  Icon,
  SearchBar,
} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

// * Import all store related stuffs
import * as HomeActions from '../../store/actions/creators/HomeActions';
import * as StoreActions from '../../store/actions/creators/StoreActions';
import * as CartActions from '../../store/actions/creators/CartActions';

// * Import all screens/components

// * Import utilites
import {addressInString, getStoreCategory} from '../../utils/helper';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class StoreDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {name: 'All', value: 'all'},
      filteredProduct: this.props.store.store
        ? this.props.store.store.products
        : [],
      productVariantForPicker: this.props.store.store
        ? this.props.store.store.products.map(product => ({
            productId: product._id,
            variantId: product.variants[0]._id,
            value: product.variants[0].value,
          }))
        : [],
      search: '',
    };
  }

  filterByCategory = category => {
    if (category.value === 'all') {
      this.setState({
        selectedCategory: category,
        filteredProduct: this.props.store.store.products,
      });
    } else
      this.setState({
        selectedCategory: category,
        filteredProduct: this.props.store.store.products.filter(
          product => product.root.category === category.value,
        ),
      });
  };

  searchProduct = search => {
    this.setState({
      selectedCategory: {name: 'All', value: 'all'},
      filteredProduct: this.props.store.store.products.filter(
        product =>
          product.root.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
      ),
    });
  };

  addToCart = productId => {
    let cart = {
      storeId: this.props.store.store._id,
      products: [
        {
          id: productId,
          variantId: this.state.productVariantForPicker.filter(
            product => product.productId === productId,
          )[0].variantId,
          quantity: 1,
        },
      ],
    };
    // * Check if the cart is empty to add first product
    if (!this.props.cart.cart.storeId) {
      this.props.updateCartToServerFetch(
        this.props.auth.authToken,
        'new',
        cart,
      );
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
            onPress: () =>
              this.props.updateCartToServerFetch(
                this.props.auth.authToken,
                'new',
                cart,
              ),
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
          this.props.updateCartToServerFetch(
            this.props.auth.authToken,
            'new',
            tempCart,
          );
          return;
        }
      }
      // * If there is new product to be added, add to cart
      else if (!productInCart) {
        let tempCart = {
          ...this.props.cart.cart,
        };
        tempCart.products.push(cart.products[0]);
        this.props.updateCartToServerFetch(
          this.props.auth.authToken,
          'new',
          tempCart,
        );
        return;
      }
    }
  };

  changeProductQuantityinCart = (type, variant) => {
    console.log(variant);

    let tempCart = {
      ...this.props.cart.cart,
    };
    let productIndexInCart = null;
    this.props.cart.cart.products.forEach((product, index) => {
      if (
        product.id === variant.productId &&
        product.variantId === variant.variantId
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
                this.props.updateCartToServerFetch(
                  this.props.auth.authToken,
                  'change',
                  tempCart,
                );
                return;
              },
            },
          ],
        );
        return;
      } else {
        this.props.updateCartToServerFetch(
          this.props.auth.authToken,
          'change',
          tempCart,
        );
      }
    } else if (type === 'decrement') {
      tempCart.products[productIndexInCart].quantity--;
      if (tempCart.products[productIndexInCart].quantity === 0) {
        tempCart.products.splice(productIndexInCart, 1);
        this.props.updateCartToServerFetch(
          this.props.auth.authToken,
          'change',
          tempCart,
        );
      } else {
        this.props.updateCartToServerFetch(
          this.props.auth.authToken,
          'change',
          tempCart,
        );
      }
    } else return;
  };

  render() {
    const Product = ({product}) => {
      return (
        <View
          style={[
            mainStyles.row,
            {
              marginBottom: 10,
            },
          ]}>
          <View
            style={[
              mainStyles.col8,
              {justifyContent: 'center', marginTop: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('product-detail-screen', {
                  productId: product._id,
                });
              }}>
              <View style={mainStyles.row}>
                <View style={mainStyles.col10}>
                  <Text style={{fontSize: 20}}>{product.root.name}</Text>
                </View>
                <View style={[mainStyles.col2, {justifyContent: 'center'}]}>
                  <Icon
                    type="font-awesome"
                    name="chevron-right"
                    size={20}
                    color="#a5a5a5"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Picker
              selectedValue={
                this.state.productVariantForPicker.filter(
                  variant => variant.productId === product._id,
                )[0].value
              }
              style={{height: 40, width: 'auto', marginTop: 10}}
              onValueChange={(itemValue, itemIndex) => {
                // * AWESOME LOGIC TO CHANGE THE VARIANT PICKER ;)
                let productIndex = null;
                this.state.productVariantForPicker.forEach((variant, i) => {
                  if (product._id === variant.productId) {
                    productIndex = i;
                  }
                });
                let tempProductVariantForPicker = this.state
                  .productVariantForPicker;
                tempProductVariantForPicker[productIndex].value = itemValue;
                tempProductVariantForPicker[productIndex].variantId =
                  product.variants[itemIndex]._id;
                this.setState({
                  productVariantForPicker: tempProductVariantForPicker,
                });
              }}>
              {product.variants.map((variant, index) => (
                <Picker.Item
                  key={index}
                  label={`${variant.value}/₹ ${variant.price}`}
                  value={variant.value}
                />
              ))}
            </Picker>
          </View>
          <View style={[mainStyles.col4, {justifyContent: 'center'}]}>
            {this.props.cart.cart ? (
              // * AWESOME LOGIC OF DISPLAYING BUTTONS BASED ON VARIANTS ADDED IN CART
              !this.props.cart.cart.products.filter(
                cartProduct =>
                  cartProduct.variantId ===
                  this.state.productVariantForPicker.filter(
                    variant => variant.productId === product._id,
                  )[0].variantId,
              )[0] ? (
                <View style={{alignItems: 'center'}}>
                  <Button
                    type="outline"
                    buttonStyle={styles.btn}
                    title="Add to cart"
                    onPress={this.addToCart.bind(null, product._id)}
                    titleStyle={{color: variables.mainThemeColor}}
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
                        this.state.productVariantForPicker.filter(
                          variant => variant.productId === product._id,
                        )[0],
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
                            this.state.productVariantForPicker.filter(
                              variant => variant.productId === product._id,
                            )[0].variantId,
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
                        this.state.productVariantForPicker.filter(
                          variant => variant.productId === product._id,
                        )[0],
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
              // * Display this at initial, if cart is empty
              <View style={{alignItems: 'center'}}>
                <Button
                  type="outline"
                  buttonStyle={styles.btn}
                  title="Add to cart"
                  onPress={this.addToCart.bind(null, product._id)}
                  titleStyle={{color: variables.mainThemeColor}}
                />
              </View>
            )}
          </View>
        </View>
      );
    };

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
              underlayColor="transparent"
            />
          }
          centerComponent={{
            text: this.props.store.store
              ? this.props.store.store.storeDetail.name
              : '',
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
          {!this.props.store.store ? (
            <Card title="Error Message" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                Some error occured, retry
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
            <View
              style={[mainStyles.container, {padding: 10, marginBottom: 100}]}>
              <View style={[mainStyles.row, {marginTop: 10}]}>
                <View style={mainStyles.col4}>
                  <Image
                    source={{uri: 'https://via.placeholder.com/100'}}
                    style={{width: 100, height: 100}}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={mainStyles.col8}>
                  <Text style={{fontSize: 20}}>
                    {addressInString(
                      this.props.store.store.storeDetail.address,
                    )}
                  </Text>
                  <View style={[mainStyles.row, {marginTop: 10}]}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Status:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'green',
                        paddingLeft: 10,
                      }}>
                      Open
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: '#aaa',
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}>
                <Text style={{fontSize: 18}}>Sort by categories</Text>
                <View style={mainStyles.row}>
                  {getStoreCategory(this.props.store.store.products).map(
                    (category, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          this.filterByCategory(category);
                        }}>
                        <Text
                          style={[
                            styles.categoryTag,
                            this.state.selectedCategory.value === category.value
                              ? styles.selected
                              : '',
                          ]}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: '#aaa',
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}>
                <SearchBar
                  placeholder="Search in Seller 1 Store..."
                  onChangeText={search => {
                    this.setState({
                      search,
                    });
                    this.searchProduct(search);
                  }}
                  value={this.state.search}
                  lightTheme
                  round
                  showLoading={false}
                  containerStyle={{backgroundColor: 'transparent'}}
                  inputContainerStyle={{backgroundColor: 'transparent'}}
                />
              </View>
              <View style={{marginTop: 10}}>
                <View>
                  <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {this.state.selectedCategory.name}:
                    </Text>
                  </View>
                  {this.state.filteredProduct.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 20,
                        marginTop: 15,
                        textAlign: 'center',
                        color: 'red',
                      }}>
                      No Product found
                    </Text>
                  ) : (
                    this.state.filteredProduct.map(product => (
                      <Product key={product._id} product={product} />
                    ))
                  )}
                </View>
              </View>
            </View>
          )}
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
  categoryTag: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: variables.mainThemeColor,
    color: variables.mainThemeColor,
    margin: 5,
    minWidth: 50,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: variables.mainThemeColor,
    color: '#fff',
  },
  btn: {
    borderRadius: 5,
    borderColor: variables.mainThemeColor,
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    sellers: state.sellers,
    store: state.store,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {...HomeActions, ...StoreActions, ...CartActions},
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreDetailScreen);
