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

import * as actionCreators from '../store/actions/creators/GetProducts';

import variables from '../styles/variables';
import mainStyles from '../styles/mainStyle';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
    };
  }

  componentDidMount() {
    this.props.getProductsFetch();
    if (this.props.products.products) {
      ('Product received');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({products: {...nextProps.products}});
  }

  renderProductList = ({item, index}) => {
    return (
      <View>
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.brand}
          chevron
          onPress={() =>
            this.props.navigation.navigate('Product Detail', {
              productId: item._id,
            })
          }
        />
      </View>
    );
  };

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
          <View style={mainStyles.container}>
            {this.state.products.products ? (
              <SafeAreaView>
                <FlatList
                  data={this.state.products.products}
                  renderItem={this.renderProductList.bind(null)}
                  keyExtractor={item => item._id.toString()}
                />
              </SafeAreaView>
            ) : this.state.products.isLoading ? (
              <ActivityIndicator
                animating={this.state.products.isLoading}
                size={50}
                color={variables.mainThemeColor}
              />
            ) : (
              <Card title="Error Message">
                <Text style={{marginBottom: 20}}>
                  {this.state.products.errMessage}
                </Text>
                <Button
                  type="outline"
                  title="Retry"
                  onPress={() => {
                    this.props.getProductsFetch();
                  }}
                />
              </Card>
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
)(ProductsScreen);
