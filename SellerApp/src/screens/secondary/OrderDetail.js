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
import {Header, Card, Text, Icon, Button} from 'react-native-elements';
import axios from 'axios';

// * Import all store related stuffs
import * as OrderActions from '../../store/actions/creators/OrdersActions';

// * Import all screens/components
import Item from '../../components/OrderItem';

// * Import utilites
import {baseUrl} from '../../utils/constant';
import {getOrderStatus} from '../../utils/helper';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        order: this.props.orders.orders.filter(
          order => order._id === this.props.route.params.orderId,
        )[0],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.orders.orders.filter(
        order => order._id === this.props.route.params.orderId,
      )[0].status !==
      this.props.orders.orders.filter(
        order => order._id === this.props.route.params.orderId,
      )[0].status
    ) {
      this.setState({
        order: this.props.orders.orders.filter(
          order => order._id === this.props.route.params.orderId,
        )[0],
      });
    }
  }

  _proceedOrder = processType => {
    Alert.alert(
      'Confirm your choice',
      `Do you want to ${
        processType === 'can' ? 'Cancel' : 'Proceed with'
      } this order?`,
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
          onPress: () => {
            axios
              .put(
                baseUrl + '/order/process-order',
                {processType, orderId: this.state.order._id},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.auth.authToken}`,
                  },
                },
              )
              .then(res => {
                console.log(res);
                this.props.getOrdersFetch(this.props.auth.authToken);
              })
              .catch(err => {
                console.log(err.response);
                dispatch(
                  processOrderFailure({
                    message: err.response
                      ? err.response.data.errMessage || 'Internal Server Error'
                      : 'Internal Server Error',
                  }),
                );
              });
          },
        },
      ],
    );
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
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: `ORDER #${this.state.order ? this.state.order._id : ''}`,
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          {!this.state.order ? (
            <ActivityIndicator />
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <Card>
                <View style={[mainStyles.row, {marginBottom: 20}]}>
                  <View style={[mainStyles.col5]}>
                    <Text style={styles.label}>Ordered by:</Text>
                  </View>
                  <View
                    style={[mainStyles.col7, mainStyles.justifyContentCenter]}>
                    <Text>
                      {this.state.order.orderedBy.personalDetail.firstName +
                        ' ' +
                        this.state.order.orderedBy.personalDetail.lastName}
                    </Text>
                  </View>
                </View>

                <View style={[mainStyles.row, {marginBottom: 20}]}>
                  <View style={[mainStyles.col5]}>
                    <Text style={styles.label}>status:</Text>
                  </View>
                  <View
                    style={[mainStyles.col7, mainStyles.justifyContentCenter]}>
                    <Text
                      style={{
                        color: getOrderStatus(this.state.order.status).color,
                      }}>
                      {getOrderStatus(this.state.order.status).name}
                    </Text>
                  </View>
                </View>

                <Text style={{fontSize: 20, marginBottom: 20}}>
                  Order Summary:
                </Text>

                {this.state.order.items.map((item, i) => (
                  <Item
                    key={i}
                    name={item.name}
                    variant={item.value}
                    quantity={item.quantity}
                    price={item.price}
                  />
                ))}
                <View style={[mainStyles.row, {marginTop: 20}]}>
                  <View style={mainStyles.col6}>
                    <Text>Item Total:</Text>
                  </View>
                  <View style={mainStyles.col6}>
                    <Text style={{textAlign: 'right'}}>
                      ₹ {this.state.order.amount.itemsPrice}
                    </Text>
                  </View>
                </View>

                <View style={[mainStyles.row, {marginTop: 20}]}>
                  <View style={mainStyles.col6}>
                    <Text>Delivery Charge:</Text>
                  </View>
                  <View style={mainStyles.col6}>
                    <Text style={{textAlign: 'right'}}>
                      ₹ {this.state.order.amount.deliveryCharge}
                    </Text>
                  </View>
                </View>

                <View style={[mainStyles.row, {marginTop: 20}]}>
                  <View style={mainStyles.col6}>
                    <Text>Payment Mode:</Text>
                  </View>
                  <View style={mainStyles.col6}>
                    <Text style={{textAlign: 'right'}}>
                      {this.state.order.paymentMode}
                    </Text>
                  </View>
                </View>
                <View style={[mainStyles.row, {marginTop: 20}]}>
                  <View style={mainStyles.col6}>
                    <Text>Payment Status:</Text>
                  </View>
                  <View style={mainStyles.col6}>
                    <Text style={{textAlign: 'right'}}>
                      {this.state.order.paymentMode === 'cod'
                        ? 'Pending'
                        : 'Completed'}
                    </Text>
                  </View>
                </View>
              </Card>
              <Card
                title="Take your action regarding this order"
                containerStyle={{
                  display: `${
                    this.state.order.status === 'pending' ? 'flex' : 'none'
                  }`,
                }}>
                <Text style={{textAlign: 'center', fontSize: 18}}>
                  Do you want to process this order?
                </Text>
                <View style={[mainStyles.row, {marginTop: 20}]}>
                  <View style={mainStyles.col6}>
                    <Button
                      title="No"
                      type="outline"
                      raised
                      titleStyle={{color: variables.mainThemeColor}}
                      buttonStyle={mainStyles.outlineBtn}
                      onPress={this._proceedOrder.bind(null, 'can')}
                    />
                  </View>
                  <View style={mainStyles.col6}>
                    <Button
                      title="Yes"
                      type="outline"
                      raised
                      titleStyle={{color: variables.mainThemeColor}}
                      buttonStyle={mainStyles.outlineBtn}
                      onPress={this._proceedOrder.bind(null, 'prc')}
                    />
                  </View>
                </View>
              </Card>
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
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...OrderActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailScreen);
