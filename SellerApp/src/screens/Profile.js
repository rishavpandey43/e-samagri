import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Header, Card, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../styles/mainStyle';

import variables from '../styles/variables';

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
              name="bars"
              size={20}
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
          rightComponent={<Icon name="user" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
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
            <View>
              <Card title="Personal Detail">
                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="user"
                      color={variables.mainThemeColor}
                      size={20}
                    />
                    <Text style={mainStyles.labelText}>Owner Name:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>John Doe</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="envelope"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Email:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>johndoe@gmail.com</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="phone"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Mobile number:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>+91 9123456789</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="map-marker"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Address:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      123 Main Street, Daltonganj, Palamu, 822101
                    </Text>
                  </View>
                </View>
              </Card>

              <Card title="Store Detail">
                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="shopping-cart"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Store Name:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>Sangam General Store</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="map-marker"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Store Address:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>
                      123 Main Street, Daltonganj, Palamu, 822101
                    </Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="file-o"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>PAN Card number:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>DNAPP3910J</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="file-o"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>GST number:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>36ARVPS3698F1ZF</Text>
                  </View>
                </View>
              </Card>

              <Card
                title="Bank Account Detail"
                containerStyle={{marginBottom: 100}}>
                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="bank"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Bank Name:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>State Bank Of India</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="credit-card"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Account number:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>1234567890</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="file-o"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>IFSC code:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>DNAPP3910J</Text>
                  </View>
                </View>

                <View style={mainStyles.infoGroup}>
                  <View style={mainStyles.labelGroup}>
                    <Icon
                      name="file-o"
                      color={variables.mainThemeColor}
                      size={20}
                      style={styles.marginRight}
                    />
                    <Text style={mainStyles.labelText}>Branch Name:</Text>
                  </View>
                  <View>
                    <Text style={mainStyles.value}>G. L. A College Branch</Text>
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
  marginRight: {
    marginRight: 10,
  },
});

export default ProfileScreen;
