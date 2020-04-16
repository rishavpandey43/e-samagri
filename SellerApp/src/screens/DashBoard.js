import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Icon, Card} from 'react-native-elements';

import mainStyles from '../styles/mainStyle';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <Header
          leftComponent={
            <Icon
              name="menu"
              color="#FFF"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'YOUR DASHBOARD',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="dashboard" color="#FFF" />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <View style={mainStyles.container}>
          <View style={mainStyles.row}>
            <View style={mainStyles.col6}>
              <Card title="Total Orders">
                <Text>50</Text>
              </Card>
            </View>
            <View style={mainStyles.col6}>
              <Card title="Today's Orders">
                <Text>50</Text>
              </Card>
            </View>
          </View>
          <View style={mainStyles.row}>
            <View style={mainStyles.col6}>
              <Card title="Order's Processing">
                <Text>50</Text>
              </Card>
            </View>
            <View style={mainStyles.col6}>
              <Card title="Order's Processed">
                <Text>50</Text>
              </Card>
            </View>
          </View>
          <View style={mainStyles.row}>
            <View style={mainStyles.col6}>
              <Card title="Total Payment Received">
                <Text>50</Text>
              </Card>
            </View>
            <View style={mainStyles.col6}>
              <Card title="Total Payment Pending">
                <Text>50</Text>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default DashBoardScreen;
