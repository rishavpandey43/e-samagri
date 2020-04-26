// * Import required modules/dependencies
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, Card, Text, Icon} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components
import Item from '../../components/OrderItem';

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            text: 'ORDER #123456788',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={mainStyles.container}>
            <Card>
              <View style={[mainStyles.row, {marginBottom: 20}]}>
                <View style={[mainStyles.col5]}>
                  <Text style={styles.label}>Ordered from:</Text>
                </View>
                <View
                  style={[mainStyles.col7, mainStyles.justifyContentCenter]}>
                  <Text>Store Dummy Name</Text>
                </View>
              </View>

              <View style={[mainStyles.row, {marginBottom: 20}]}>
                <View style={[mainStyles.col5]}>
                  <Text style={styles.label}>status:</Text>
                </View>
                <View
                  style={[mainStyles.col7, mainStyles.justifyContentCenter]}>
                  <Text style={{color: 'orange'}}>PROCESSING</Text>
                </View>
              </View>

              <Text style={{fontSize: 20, marginBottom: 20}}>
                Order Summary:
              </Text>

              <Item
                name="Kurkure Masala munch"
                variant="50 gm"
                quantity="1"
                price="100"
              />
              <Item
                name="Parrot Haldi Powder"
                variant="100 gm"
                quantity="2"
                price="80"
              />
              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Item Total:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>₹ 250</Text>
                </View>
              </View>

              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Delivery Charge:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>₹ 65</Text>
                </View>
              </View>

              <View style={[mainStyles.row, {marginTop: 20}]}>
                <View style={mainStyles.col6}>
                  <Text>Paid Online:</Text>
                </View>
                <View style={mainStyles.col6}>
                  <Text style={{textAlign: 'right'}}>ID-2345TF4567</Text>
                </View>
              </View>
            </Card>
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
});

export default OrderDetailScreen;
