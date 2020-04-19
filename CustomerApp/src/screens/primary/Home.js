import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../styles/mainStyle';

class HomeScreen extends Component {
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
              name="bars"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'Hello Rishav Pandey',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="home" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={mainStyles.container}>
            <Text>I'm Home Screen</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
