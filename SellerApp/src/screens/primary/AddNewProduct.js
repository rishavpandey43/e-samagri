import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  Header,
  Card,
  Button,
  Text,
  Input,
  CheckBox,
  Icon,
} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome'
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

import CardCustomTitle from '../../components/CardCustomTitle';

import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

import * as AddNewProductActions from '../../store/actions/creators/AddNewProductActions';

import * as helper from '../../utils/helper';
import {baseUrl, categoryList} from '../../utils/constant';

const sellerId1 = '5e9fb135233b5b03d51de35b';
const sellerId2 = '5e9fb291df5cf41033ca39e0';
const sellerId3 = '5e9fb2a3df5cf41033ca39e1';

class AddNewProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: '',
        category: '',
        type: 'packet',
        brand: '',
        variants: [
          {
            value: '',
            price: '',
            stock: '',
          },
        ],
      },
    };
  }

  addProduct = () => {
    let tempData = this.state.product;
    let isEmpty = false;
    for (const item in tempData) {
      if (typeof tempData[item] === 'string') {
        if (tempData[item] == '') {
          isEmpty = true;
        }
      } else if (typeof tempData[item] === 'object') {
        tempData[item].forEach(element => {
          if (element.value === '' || element.price === '') {
            isEmpty = true;
          }
        });
      }
    }
    if (isEmpty) {
      Alert.alert('Input Invalid', 'Please fill all the details to continue.');
      return;
    } else {
      let data = {
        general: {
          name: tempData.name.toLowerCase(),
          category: tempData.category.toLowerCase(),
          type: tempData.type.toLowerCase(),
          brand: tempData.brand.toLowerCase(),
        },
        sellerSpecific: {
          variants: tempData.variants.map(item => ({
            value: item.value.toLowerCase(),
            price: item.price.toLowerCase(),
            stock: item.stock.toLowerCase(),
          })),
        },
      };

      axios
        .post(baseUrl + '/seller/add-new-product', data, {
          params: {
            id: sellerId2,
          },
        })
        .then(res => {
          this.setState({
            product: {
              name: '',
              category: '',
              type: 'packet',
              brand: '',
              variants: [
                {
                  value: '',
                  price: '',
                  stock: '',
                },
              ],
            },
          });
          ToastAndroid.show(
            res.data.successMessage || 'Product has been added successfull',
            ToastAndroid.LONG,
          );
        })
        .catch(err => {
          ToastAndroid.show(
            err.response.data.errMessage ||
              "Product can't be added, please try again",
            ToastAndroid.LONG,
          );
        });
    }
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              size={20}
              color="#FFF"
              type="font-awesome"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'ADD NEW PRODUCT',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          {this.props.profile.fetchingProfile ? (
            <View
              style={{
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : this.props.profile.errMessage || !this.props.profile.profile ? (
            <Card title="Error Message" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                {this.props.profile.errMessage || 'Internal Server Error'}
              </Text>
              <Button
                title="Retry"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
                onPress={() => {
                  this.props.getProfileFetch();
                }}
              />
            </Card>
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <View style={mainStyles.formGroup}>
                <Input
                  label="Product Name:"
                  placeholder="Kurkure Masala Munch"
                  value={this.state.product.name}
                  onChangeText={name => {
                    this.setState({
                      product: {
                        ...this.state.product,
                        name,
                      },
                    });
                  }}
                />
              </View>

              <View style={mainStyles.formGroup}>
                <Input
                  label="Type:"
                  inputContainerStyle={{borderBottomColor: 'transparent'}}
                  inputComponent={() => (
                    <Picker
                      selectedValue={this.state.product.category}
                      style={{
                        height: 50,
                        width: '100%',
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          product: {
                            ...this.state.product,
                            category: itemValue,
                          },
                        })
                      }>
                      {categoryList.map(category => (
                        <Picker.Item
                          key={category.value}
                          label={category.name}
                          value={category.value}
                        />
                      ))}
                    </Picker>
                  )}
                />
              </View>

              <View style={mainStyles.formGroup}>
                <Input
                  label="Type:"
                  inputContainerStyle={{borderBottomColor: 'transparent'}}
                  inputComponent={() => (
                    <View style={{flexDirection: 'row'}}>
                      <View style={mainStyles.col6}>
                        <CheckBox
                          containerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                          }}
                          center
                          title="Loose"
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={variables.mainThemeColor}
                          checked={this.state.product.type === 'loose'}
                          onPress={() => {
                            this.setState({
                              product: {
                                ...this.state.product,
                                type: 'loose',
                              },
                            });
                          }}
                        />
                      </View>
                      <View style={mainStyles.col6}>
                        <CheckBox
                          containerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                          }}
                          center
                          title="Packet"
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={variables.mainThemeColor}
                          checked={this.state.product.type === 'packet'}
                          onPress={() => {
                            this.setState({
                              product: {
                                ...this.state.product,
                                type: 'packet',
                              },
                            });
                          }}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>

              <View style={mainStyles.formGroup}>
                <Input
                  label="Brand:"
                  placeholder="Pepsico, Nestle, write - for no brand"
                  value={this.state.product.brand}
                  onChangeText={brand => {
                    this.setState({
                      product: {
                        ...this.state.product,
                        brand,
                      },
                    });
                  }}
                />
              </View>

              <View style={mainStyles.formGroup}>
                <View style={[mainStyles.row, {marginLeft: 5}]}>
                  <View style={mainStyles.col6}>
                    <Text
                      style={{
                        color: '#83909A',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Variants:
                    </Text>
                  </View>
                  <View style={[mainStyles.col6, {alignItems: 'center'}]}>
                    <Icon
                      name="plus"
                      size={25}
                      type="font-awesome"
                      color={variables.mainThemeColor}
                      onPress={() => {
                        let variants = this.state.product.variants;
                        variants.push({
                          value: '',
                          price: '',
                        });
                        this.setState({
                          product: {
                            ...this.state.product,
                            variants,
                          },
                        });
                      }}
                    />
                  </View>
                </View>

                <Input
                  inputContainerStyle={{borderBottomColor: 'transparent'}}
                  inputComponent={() => (
                    <View>
                      {this.state.product.variants.map((item, index) => (
                        <View key={index}>
                          <View style={[mainStyles.row, {marginTop: 10}]}>
                            <View style={mainStyles.col11}>
                              <View style={mainStyles.row}>
                                <View style={mainStyles.col7}>
                                  <Input
                                    label="Value"
                                    placeholder="500 gm or 1 pc"
                                    value={
                                      this.state.product.variants[index].value
                                    }
                                    onChangeText={value => {
                                      let variants = [
                                        ...this.state.product.variants,
                                      ];
                                      variants[index].value = value;
                                      this.setState({
                                        product: {
                                          ...this.state.product,
                                          variants,
                                        },
                                      });
                                    }}
                                  />
                                </View>
                                <View style={mainStyles.col5}>
                                  <Input
                                    label="Price"
                                    keyboardType="numeric"
                                    placeholder="45"
                                    value={
                                      this.state.product.variants[index].price
                                    }
                                    onChangeText={price => {
                                      let variants = [
                                        ...this.state.product.variants,
                                      ];
                                      variants[index].price = price;
                                      this.setState({
                                        product: {
                                          ...this.state.product,
                                          variants,
                                        },
                                      });
                                    }}
                                  />
                                </View>
                                <View style={mainStyles.col6}>
                                  <Input
                                    label="Stock"
                                    keyboardType="numeric"
                                    placeholder="20"
                                    value={
                                      this.state.product.variants[index].stock
                                    }
                                    onChangeText={stock => {
                                      let variants = [
                                        ...this.state.product.variants,
                                      ];
                                      variants[index].stock = stock;
                                      this.setState({
                                        product: {
                                          ...this.state.product,
                                          variants,
                                        },
                                      });
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                            <View
                              style={[
                                mainStyles.col1,
                                {justifyContent: 'center'},
                              ]}>
                              <Icon
                                name="times"
                                size={25}
                                color="red"
                                type="font-awesome"
                                containerStyle={{
                                  display: `${
                                    this.state.product.variants.length > 1
                                      ? 'flex'
                                      : 'none'
                                  }`,
                                }}
                                onPress={() => {
                                  let variants = this.state.product.variants;
                                  variants.splice(index, 1);
                                  this.setState({
                                    product: {
                                      ...this.state.product,
                                      variants,
                                    },
                                  });
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>

              <View style={[mainStyles.row, {marginBottom: 20}]}>
                <View style={mainStyles.col6}>
                  <Button
                    title="Cancel"
                    titleStyle={{color: variables.mainThemeColor}}
                    type="outline"
                    buttonStyle={mainStyles.outlineBtn}
                    onPress={() => {
                      this.setState({
                        bankDetailCardDisplay: false,
                        bankDetail: {
                          name: '',
                          accountNumber: '',
                          ifscCode: '',
                          branchName: '',
                        },
                      });
                    }}
                  />
                </View>
                <View style={mainStyles.col6}>
                  <Button
                    title="Submit"
                    titleStyle={{color: variables.mainThemeColor}}
                    type="outline"
                    buttonStyle={mainStyles.outlineBtn}
                    onPress={this.addProduct.bind(null)}
                    loading={this.props.profile.profileUpdating}
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...AddNewProductActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewProductScreen);

{
  /* <View style={mainStyles.col6}>

</View>; */
}

{
  /* <View style={[mainStyles.col2, {justifyContent: 'center3'}]}>

</View>; */
}
