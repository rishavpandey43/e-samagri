import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actionCreators from '../store/actions/creators/GetProducts';

import variables from '../styles/variables';
import mainStyles from '../styles/mainStyle';

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params.productId) {
      this.setState({
        product: this.props.products.products.filter(
          product => product._id === this.props.route.params.productId,
        )[0],
      });
    }
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'YOUR PRODUCTS',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="product-hunt" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View>
            {this.state.product ? (
              <Card title="Product Detail">
                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Name:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      {this.state.product.name}
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Brand:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      {this.state.product.brand}
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Description:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      {this.state.product.desc}
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Category:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      {this.state.product.category}
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Type:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      {this.state.product.type}
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Text style={mainStyles.labelText}>Variants:</Text>
                  </View>
                  <FlatList
                    data={this.state.product.quantity}
                    renderItem={item => {
                      return (
                        <View key={item.index} style={mainStyles.row}>
                          <View style={mainStyles.col6}>
                            <View style={mainStyles.infoGroup}>
                              <View style={mainStyles.labelGroup}>
                                <Text style={mainStyles.labelText}>
                                  Quantity:
                                </Text>
                              </View>
                              <View>
                                <Text style={mainStyles.value}>
                                  {item.item.value}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={mainStyles.col6}>
                            <View style={mainStyles.infoGroup}>
                              <View style={mainStyles.labelGroup}>
                                <Text style={mainStyles.labelText}>Price:</Text>
                              </View>
                              <View>
                                <Text style={mainStyles.value}>
                                  {item.item.price}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                </View>
              </Card>
            ) : (
              <ActivityIndicator size={50} color={mainStyles.mainThemeColor} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
