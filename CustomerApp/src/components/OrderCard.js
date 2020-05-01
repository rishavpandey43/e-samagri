// * Import required modules/dependencies
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Card} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../styles/mainStyle';
import variables from '../styles/variables';

const OrderCard = ({order, navigation}) => {
  return (
    <Card containerStyle={{borderRadius: 10}}>
      <View style={mainStyles.row}>
        <View style={mainStyles.col6}>
          <View>
            <Text style={styles.title}>Order Date</Text>
            <Text>{order.createdAt}</Text>
          </View>
          <View style={styles.marginTop}>
            <Text style={{color: 'orange'}}>{order.status}</Text>
          </View>
        </View>
        <View style={mainStyles.col6}>
          <View>
            <Text style={styles.title}>Order Id</Text>
            <Text>#{order._id}</Text>
          </View>
          <View style={styles.marginTop}>
            <Button
              title="View Details"
              type="outline"
              raised
              titleStyle={{color: variables.mainThemeColor}}
              onPress={() => {
                navigation.navigate('order-detail-screen', {
                  orderId: order._id,
                });
              }}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  marginTop: {
    marginTop: 25,
  },
});

export default OrderCard;
