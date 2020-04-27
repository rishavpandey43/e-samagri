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

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempFirstName: '',
      tempLastName: '',
      tempEmail: '',
      tempPhone: '',
      emailOTP: '',
      phoneOTP: '',
      displayEmailOTPField: false,
      displayPhoneOTPField: false,
    };
  }

  render() {
    return (
      <View style={{justifyContent: 'center', height: '100%'}}>
        <Card title="Register your account for free">
          <View>
            <View>
              <View style={mainStyles.formGroup}>
                <Input
                  label="First Name"
                  placeholder="John"
                  value={this.state.tempFirstName}
                />
              </View>
              <View style={mainStyles.formGroup}>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={this.state.tempLastName}
                />
              </View>
              {!this.state.displayEmailOTPField ? (
                <View>
                  <View style={mainStyles.formGroup}>
                    <Input
                      label="Email"
                      placeholder="johndoe@john.com"
                      value={this.state.tempEmail}
                    />
                  </View>
                  <View
                    style={[mainStyles.formGroup, {alignItems: 'flex-start'}]}>
                    <Button
                      title="Get OTP for email"
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
                      keyboardType="numeric"
                      label="OTP for Email"
                      placeholder="123456"
                      value={this.state.emailOTP}
                    />
                  </View>
                  <View
                    style={[mainStyles.formGroup, {alignItems: 'flex-start'}]}>
                    <Button
                      title="Resend OTP to email"
                      titleStyle={{color: variables.mainThemeColor}}
                      type="outline"
                      buttonStyle={mainStyles.outlineBtn}
                    />
                  </View>
                </View>
              )}

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
                  title="Register"
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

export default RegisterScreen;
