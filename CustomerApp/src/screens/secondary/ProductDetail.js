// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
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
                            console.log(itemValue);
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
                        <View>
                          <Button
                            type="outline"
                            buttonStyle={styles.btn}
                            title="Add to cart"
                            onPress={() => {
                              console.log('button click');
                            }}
                            titleStyle={{color: variables.mainThemeColor}}
                          />
                        </View>
                        <View style={[mainStyles.row, {marginTop: 15}]}>
                          <View style={{flex: 1}}>
                            <Button
                              type="outline"
                              buttonStyle={[styles.btn, {padding: 2}]}
                              title="-"
                              onPress={() => {
                                console.log('button click');
                              }}
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
                            <Text style={{fontSize: 18}}>1</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Button
                              type="outline"
                              buttonStyle={[styles.btn, {padding: 2}]}
                              title="+"
                              onPress={() => {
                                console.log('button click');
                              }}
                              titleStyle={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: variables.mainThemeColor,
                              }}
                            />
                          </View>
                        </View>
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
