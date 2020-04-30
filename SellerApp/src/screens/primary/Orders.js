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
import {
  Header,
  Card,
  ListItem,
  Button,
  Text,
  Icon,
} from 'react-native-elements';

import * as actionCreators from '../../store/actions/creators/GetOrders';

import variables from '../../styles/variables';
import mainStyles from '../../styles/mainStyle';

import * as helper from '../../utils/helper';

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.orders,
    };
  }

  componentDidMount() {
    this.props.getOrdersFetch();
    if (this.props.orders.orders) {
      ('Product received');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({orders: {...nextProps.orders}});
  }

  renderOrderList = ({item, index}) => {
    return (
      <View>
        <ListItem
          key={index}
          title={helper.obtainItemsInString(item.items)}
          subtitle={`Status- ${item.status}`}
          chevron
          onPress={() =>
            this.props.navigation.navigate('Order Detail', {
              orderId: item._id,
            })
          }>
          <Text />
        </ListItem>
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
              type="font-awesome"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'YOUR ORDERS',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              name="product-hunt"
              type="font-awesome"
              color="#FFF"
              size={30}
            />
          }
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={mainStyles.container}>
            {this.state.orders.orders ? (
              <SafeAreaView>
                <FlatList
                  data={this.state.orders.orders}
                  renderItem={this.renderOrderList.bind(null)}
                  keyExtractor={item => item._id.toString()}
                />
              </SafeAreaView>
            ) : this.state.orders.isLoading ? (
              <ActivityIndicator
                animating={this.state.orders.isLoading}
                size={50}
                color={variables.mainThemeColor}
              />
            ) : (
              <Card title="Error Message">
                <Text style={{marginBottom: 20}}>
                  {this.state.orders.errMessage}
                </Text>
                <Button
                  type="outline"
                  title="Retry"
                  onPress={() => {
                    this.props.getOrdersFetch();
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
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersScreen);
