import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getDataFromAsync} from '../../utils/helper';

import mainStyles from '../../styles/mainStyle';

import * as ProfileActions from '../../store/actions/creators/ProfileActions';
import * as AuthActions from '../../store/actions/creators/AuthActions';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getDataFromAsync('eSamagri_seller_auth_token')
      .then(token => {
        this.props.getTokenFromAsync(token);
        this.props.getProfileFetch(this.props.auth.authToken);
      })
      .catch(err => {
        console.log(err);
      });
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
            text: 'YOUR DASHBOARD',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="dashboard" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...AuthActions, ...ProfileActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoardScreen);
