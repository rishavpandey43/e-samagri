// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Header, Card, Text, Icon} from 'react-native-elements';

// * Import all store related stuffs
import * as actionCreators from '../../store/actions/creators/GetOrders';

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.route.params.orderId + 1) {
      this.setState({
        order: this.props.orders.orders.filter(
          order => order._id === this.props.route.params.orderId,
        )[0],
      });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="font-awesome"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'YOUR ORDERS',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View>
            {this.state.order ? (
              <Card title={`Order Id- ${this.state.order._id}`}>
                <Text>Items:</Text>
                <FlatList
                  data={this.state.order.items}
                  renderItem={item => {
                    return (
                      <View
                        style={[
                          mainStyles.row,
                          {
                            marginBottom: 10,
                            padding: 5,
                            borderBottomWidth: 2,
                            borderBottomColor: '#eaeaea',
                          },
                        ]}>
                        <View style={mainStyles.col6}>
                          <Text>{`Name- ${item.item.name}`}</Text>
                          <Text>{`Quantity- ${item.item.quantity}`}</Text>
                          <Text>{`x${item.item.unit}`}</Text>
                        </View>
                        <View
                          style={[
                            mainStyles.col6,
                            {
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            },
                          ]}>
                          <Text>{`Price- ${item.item.price}`}</Text>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Text>Ordered By:</Text>
                <Text>{`${this.state.order.orderedBy.firstName} ${
                  this.state.order.orderedBy.lastName
                }`}</Text>
                <Text>Total Price:</Text>
                <Text>{this.state.order.amount}</Text>
              </Card>
            ) : (
              <ActivityIndicator size={50} color={mainStyles.mainThemeColor} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
)(OrderDetailScreen);
