import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Header, Card, ListItem, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as ProductsActions from '../../store/actions/creators/ProductsActions';

import variables from '../../styles/variables';
import mainStyles from '../../styles/mainStyle';

class ProductsScreen extends Component {
  componentDidMount() {
    this.props.getProductsFetch();
  }

  render() {
    console.log(this.props.products);
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
          {this.props.products.fetchingProduct ? (
            <View
              style={{
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : this.props.products.errMessage ? (
            <Card title="Error Message" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                {this.props.products.errMessage || 'Internal Server Error'}
              </Text>
              <Button
                title="Retry"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
                onPress={() => {
                  this.props.getProductsFetch();
                }}
              />
            </Card>
          ) : this.props.products.products.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Card containerStyle={{alignItems: 'center'}}>
                <Text style={{marginBottom: 20, fontSize: 20, color: 'green'}}>
                  No Product in your store.
                </Text>
                <Button
                  title="Add your first product now"
                  type="outline"
                  titleStyle={{color: variables.mainThemeColor}}
                  buttonStyle={mainStyles.outlineBtn}
                  onPress={() => {
                    this.props.navigation.navigate('add-new-product-stack');
                  }}
                />
              </Card>
            </View>
          ) : (
            <FlatList
              data={this.props.products.products}
              renderItem={({item, index}) => (
                <ListItem
                  key={index}
                  title={item.root.name}
                  subtitle={`${item.variants.length} Variants`}
                  chevron
                  onPress={() =>
                    this.props.navigation.navigate('product-detail-screen', {
                      productId: item._id,
                    })
                  }
                />
              )}
              keyExtractor={item => item._id.toString()}
            />
          )}
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
  return bindActionCreators(ProductsActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsScreen);
