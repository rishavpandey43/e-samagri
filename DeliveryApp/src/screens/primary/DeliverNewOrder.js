// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Text, Header, Card, Button, Icon} from 'react-native-elements';
import axios from 'axios';

// * Import all store related stuffs
import * as OrderActions from '../../store/actions/creators/OrdersActions';

// * Import all screens/components

// * Import utilites
import {baseUrl} from '../../utils/constant';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class DeliverNewOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      refreshing: false,
      error: '',
    };
  }

  componentDidMount() {
    this._refreshList();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.orders.orders, this.props.orders.orders);
  }

  _refreshList = () => {
    this.setState({refreshing: true});
    axios
      .get(baseUrl + '/order/get-delivery-not-assigned-orders-deliveryAgent', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.auth.authToken}`,
        },
      })
      .then(res => {
        this.setState({refreshing: false});
        this.setState({
          orderList: [...res.data.orders].map(order => {
            return {
              ...order,
              updating: false,
            };
          }),
        });
      })
      .catch(err => {
        this.setState({refreshing: false});
      });
  };

  render() {
    const OrderCard = ({order}) => (
      <Card title="Order Detail" containerStyle={{borderRadius: 10}}>
        <View style={styles.wrapper}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Store Name:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.value}>
              {order.orderedFrom.storeDetail.name}
            </Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Total items in order:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.value}>
              {order.items.reduce((acc, cur) => acc + cur.quantity, 0)}
            </Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Total Amount:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.value}>
              {order.amount.itemsPrice + order.amount.deliveryCharge}
            </Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Mode of Payment:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.value}>{order.paymentMode}</Text>
          </View>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.label}>Do you want to deliver this order?</Text>
          <View style={{marginTop: 20}}>
            <Button
              title="YES"
              titleStyle={{color: variables.mainThemeColor}}
              type="outline"
              raised
              buttonStyle={mainStyles.outlineBtn}
              onPress={() => {
                this.props.processOrderFetch(
                  this.props.auth.authToken,
                  'yes',
                  order._id,
                );
              }}
            />
          </View>
        </View>
      </Card>
    );

    return (
      <View>
        <Header
          leftComponent={
            <Icon
              type="font-awesome"
              name="bars"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'Deliver New Order',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View
            style={(mainStyles.container, {padding: 15, marginBottom: 100})}>
            <View>
              <Text h4>
                You can search for new orders waiting for delivery around you.
              </Text>
              <View style={{margin: 25}}>
                <Button
                  title="Refresh the page"
                  titleStyle={{color: variables.mainThemeColor}}
                  type="outline"
                  raised
                  buttonStyle={mainStyles.outlineBtn}
                  onPress={this._refreshList.bind(null)}
                />
              </View>
              <View>
                {this.state.refreshing ? <ActivityIndicator /> : null}
                {this.state.orderList.map(order => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
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
)(DeliverNewOrderScreen);
