import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Header, Icon, Card, Avatar} from 'react-native-elements';

import mainStyles from '../styles/mainStyle';

import variable from '../styles/variables';

class ProfileScreen extends Component {
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
              name="menu"
              color="#FFF"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'YOUR PROFILE',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="account-box" color="#FFF" />}
          containerStyle={{
            backgroundColor: variable.mainThemeColor,
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={mainStyles.container}>
            <View style={styles.profileImg}>
              <Avatar
                size="large"
                title="Seller 1"
                rounded
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <Text h1>John Doe Seller</Text>
            </View>
            <View style={styles.personalInfo}>
              <Card title="Personal Information">
                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="person-outline"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Owner Name:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>John Doe</Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="mail-outline"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Email:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>johndoe@gmail.com</Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="phone"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Mobile number:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>+91 9123456789</Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="map"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Address:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>
                      123 Main Street, Daltonganj, Palamu, 822101
                    </Text>
                  </View>
                </View>
              </Card>
              <Card
                title="Store Information"
                containerStyle={{marginBottom: 100}}>
                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="store"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Store Name:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>Sangam General Store</Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="map"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>Store Address:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>
                      123 Main Street, Daltonganj, Palamu, 822101
                    </Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="bookmark"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>PAN Card number:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>DNAPP3910J</Text>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <View style={styles.labelGroup}>
                    <Icon
                      name="bookmark"
                      color={variable.mainThemeColor}
                      size={20}
                    />
                    <Text style={styles.labelText}>GST number:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>36ARVPS3698F1ZF</Text>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImg: {
    margin: 10,
    alignItems: 'center',
  },
  personalInfo: {
    flex: 1,
    width: '100%',
  },
  infoGroup: {
    margin: 10,
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 20,
  },
  labelText: {
    fontSize: 20,
    color: '#797A9C',
    fontStyle: 'italic',
    paddingLeft: 10,
  },
  value: {
    color: variable.mainThemeColor,
    fontSize: 20,
  },
});

export default ProfileScreen;
