// * Import required modules/dependencies
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Header, Card, Text, Button, Image, Icon} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
    };
  }

  render() {
    const ItemCard = () => {
      return (
        <Card>
          <View style={mainStyles.row}>
            <View style={mainStyles.col5}>
              <Image
                source={{uri: 'https://via.placeholder.com/100'}}
                style={{width: 100, height: 100}}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={mainStyles.col7}>
              <View style={mainStyles.row}>
                <View style={mainStyles.col9}>
                  <Text>Kurkure Masala Munch</Text>
                  <Text style={{marginTop: 15}}>₹ 20 / 90 gm</Text>
                </View>
                <View style={[mainStyles.col3, {justifyContent: 'center'}]}>
                  <Text style={{textAlign: 'center'}}>₹ 20</Text>
                </View>
              </View>

              <View style={[mainStyles.row, {marginTop: 15}]}>
                <View style={mainStyles.col4}>
                  <Button type="outline" buttonStyle={styles.btn} title="-" />
                </View>
                <View
                  style={[
                    mainStyles.col4,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text>1</Text>
                </View>
                <View style={mainStyles.col4}>
                  <Button type="outline" buttonStyle={styles.btn} title="+" />
                </View>
              </View>
            </View>
          </View>
        </Card>
      );
    };

    return (
      <View style={{flex: 1}}>
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
            text: 'Your Cart',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <View style={{height: '62%'}}>
          <ScrollView>
            <View style={mainStyles.row}>
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#fff',
            width: '100%',
            padding: 10,
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          <View style={[mainStyles.row, {marginTop: 20}]}>
            <View style={mainStyles.col6}>
              <Text>Items Total Price:</Text>
            </View>
            <View style={mainStyles.col6}>
              <Text style={{textAlign: 'right'}}>₹ 65</Text>
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
              <Text>Final Amount:</Text>
            </View>
            <View style={mainStyles.col6}>
              <Text style={{textAlign: 'right'}}>₹ 130</Text>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center', margin: 10}}>
            <Button
              title="Checkout"
              buttonStyle={{
                width: 150,
                borderRadius: 20,
                backgroundColor: variables.mainThemeColor,
              }}
            />
          </View>
        </View>
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
    width: '120%',
    height: 20,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
});

export default CartScreen;
