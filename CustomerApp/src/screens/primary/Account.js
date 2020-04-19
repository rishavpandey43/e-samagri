import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Button} from 'react-native';
import {Header, Card, Avatar, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Address from '../../components/Address';

import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class AccountScreen extends Component {
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
            text: 'My Account',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="home" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={[mainStyles.container, {marginBottom: 100}]}>
            <Card containerStyle={{borderRadius: 10}}>
              <View style={mainStyles.alignCenter}>
                <Avatar
                  size="large"
                  title="RP"
                  rounded
                  source={require('../../assets/images/boy.png')}
                />
              </View>
              <View style={{marginTop: 20}}>
                <View style={mainStyles.row}>
                  <View
                    style={[
                      mainStyles.col9,
                      {
                        borderRightWidth: 1,
                        borderRightColor: '#aaa',
                      },
                    ]}>
                    <Text style={styles.title}>Rishav Pandey</Text>
                    <Text style={styles.subTitle}>+91-9771578320</Text>
                    <Text style={styles.subTitle}>demo@demo.com</Text>
                  </View>
                  <View style={mainStyles.col3}>
                    <View
                      style={[
                        mainStyles.alignCenter,
                        mainStyles.justifyContentCenter,
                      ]}>
                      <Icon
                        name="pencil"
                        color={variables.mainThemeColor}
                        size={30}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Card>

            <Card
              containerStyle={{borderRadius: 10}}
              title="Saved Addresses"
              titleStyle={{fontSize: 20}}>
              <Address
                type="Home"
                value="204, 205, Ground floor, E-block, Gandhi Vihar, Gopalpur Village, Delhi, 110009, India"
              />
              <Address
                type="Work"
                value="204, 205, Ground floor, E-block, Gandhi Vihar, Gopalpur Village, Delhi, 110009, India"
              />
              <Address
                type="Other"
                value="204, 205, Ground floor, E-block, Gandhi Vihar, Gopalpur Village, Delhi, 110009, India"
              />
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginLeft: 10,
    color: variables.mainFontColor,
  },
  subTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: variables.secFontColor,
  },
});

export default AccountScreen;
