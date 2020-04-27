// * Import required modules/dependencies
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';

// * Import all store related stuffs

// * Import all screens/components

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempPhone: '',
      phoneOTP: '',
      displayPhoneOTPField: false,
    };
  }

  render() {
    return (
      <View style={{justifyContent: 'center', height: '100%'}}>
        <Card title="Welcome back :)">
          <View>
            <View>
              {!this.state.displayPhoneOTPField ? (
                <View>
                  <View style={mainStyles.formGroup}>
                    <Input
                      label="Phone number"
                      keyboardType="numeric"
                      placeholder="97735XXXX0"
                      value={this.state.tempPhone}
                    />
                  </View>
                  <View
                    style={[mainStyles.formGroup, {alignItems: 'flex-start'}]}>
                    <Button
                      title="Get OTP for phone"
                      titleStyle={{color: variables.mainThemeColor}}
                      type="outline"
                      buttonStyle={mainStyles.outlineBtn}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={mainStyles.formGroup}>
                    <Input
                      label="OTP for Phone"
                      keyboardType="numeric"
                      placeholder="123456"
                      value={this.state.phoneOTP}
                    />
                  </View>
                  <View
                    style={[mainStyles.formGroup, {alignItems: 'flex-start'}]}>
                    <Button
                      title="Resend OTP to phone"
                      titleStyle={{color: variables.mainThemeColor}}
                      type="outline"
                      buttonStyle={mainStyles.outlineBtn}
                    />
                  </View>
                </View>
              )}
            </View>
            <View
              style={[
                mainStyles.row,
                {
                  marginBottom: 20,
                  paddingTop: 20,
                  marginTop: 15,
                },
              ]}>
              <View style={mainStyles.col6}>
                <Button
                  title="Cancel"
                  titleStyle={{color: variables.mainThemeColor}}
                  type="outline"
                  buttonStyle={mainStyles.outlineBtn}
                  onPress={() => {
                    this.setState({
                      personalDetailCardDisplay: false,
                    });
                  }}
                />
              </View>
              <View style={mainStyles.col6}>
                <Button
                  title="Login"
                  titleStyle={{color: variables.mainThemeColor}}
                  type="outline"
                  buttonStyle={mainStyles.outlineBtn}
                  // onPress={() => {
                  //   this.updateDetail('personalDetail');
                  // }}
                  // loading={this.props.profile.profileUpdating}
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default LoginScreen;
