// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Card,
  Text,
  Button,
  Image,
  SearchBar,
  Avatar,
  Icon,
  Input,
} from 'react-native-elements';

// * Import all store related stuffs
import * as ProfileActions from '../../store/actions/creators/ProfileActions';

// * Import all screens/components
import Address from '../../components/Address';
import CardCustomTitle from '../../components/CardCustomTitle';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class UpdateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalDetailCardDisplay: false,
      addressDetailCardDisplay: false,
      personalDetail: {},
      addressDetail: {
        street: '',
        landmark: '',
        city: '',
        pincode: '',
      },
    };
  }

  toggleEditCardDisplay = target => {
    this.setState({[target]: !this.state[target]});
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="font-awesome"
              size={20}
              color="#FFF"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'Update Your Profile',
            style: {color: '#fff'},
          }}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          {this.props.profile.fetchingProfile ? (
            <View
              style={{
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : this.props.profile.errMessage || !this.props.profile.profile ? (
            <Card title="Error Message" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                {this.props.profile.errMessage || 'Internal Server Error'}
              </Text>
              <Button
                title="Retry"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
                onPress={() => {
                  this.props.getProfileFetch();
                }}
              />
            </Card>
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <Card
                title={
                  <CardCustomTitle
                    title="Update your personal detail"
                    detail={this.props.profile.profile.personalDetail}
                    onPress={() => {
                      this.toggleEditCardDisplay('personalDetailCardDisplay');
                    }}
                  />
                }>
                <View
                  style={{
                    display: `${
                      this.state.personalDetailCardDisplay ? 'flex' : 'none'
                    }`,
                  }}>
                  <View>
                    <View style={mainStyles.formGroup}>
                      <Input label="First Name" placeholder="John" />
                    </View>
                    <View style={mainStyles.formGroup}>
                      <Input label="Last Name" placeholder="Doe" />
                    </View>
                    <View style={mainStyles.formGroup}>
                      <View style={mainStyles.row}>
                        <View style={mainStyles.col8}>
                          <Input label="Email" placeholder="johndoe@john.com" />
                        </View>
                        <View
                          style={[
                            mainStyles.col4,
                            {justifyContent: 'flex-end'},
                          ]}>
                          <Button
                            title="Get OTP"
                            titleStyle={{color: variables.mainThemeColor}}
                            type="outline"
                            buttonStyle={mainStyles.outlineBtn}
                          />
                        </View>
                      </View>
                      <View style={{display: 'none'}}>
                        <Input placeholder="OTP of email" />
                      </View>
                    </View>
                    <View style={mainStyles.formGroup}>
                      <View style={mainStyles.row}>
                        <View style={mainStyles.col8}>
                          <Input
                            label="Mobile Number"
                            placeholder="9876543210"
                          />
                        </View>
                        <View
                          style={[
                            mainStyles.col4,
                            {justifyContent: 'flex-end'},
                          ]}>
                          <Button
                            title="Get OTP"
                            titleStyle={{color: variables.mainThemeColor}}
                            type="outline"
                            buttonStyle={mainStyles.outlineBtn}
                          />
                        </View>
                      </View>
                      <View style={{display: 'none'}}>
                        <Input placeholder="OTP of phone" />
                      </View>
                    </View>
                  </View>
                  <View style={[mainStyles.row, {marginBottom: 20}]}>
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
                        title="Submit"
                        titleStyle={{color: variables.mainThemeColor}}
                        type="outline"
                        buttonStyle={mainStyles.outlineBtn}
                        onPress={() => {
                          this.updateDetail('personalDetail');
                        }}
                        loading={this.props.profile.profileUpdating}
                      />
                    </View>
                  </View>
                </View>
              </Card>

              <Card
                title={
                  <CardCustomTitle
                    title="Update your addresses"
                    detail={this.props.profile.profile.personalDetail}
                    onPress={() => {
                      this.toggleEditCardDisplay('addressDetailCardDisplay');
                    }}
                  />
                }>
                <View
                  style={{
                    display: `${
                      this.state.addressDetailCardDisplay ? 'flex' : 'none'
                    }`,
                  }}>
                  <View>
                    <Address
                      type="home"
                      value="204, 205, Ground floor, E-block, Gandhi Vihar, Gopalpur Village, Delhi, 110009, India"
                      edit
                    />
                    <Address
                      type="work"
                      value="204, 205, Ground floor, E-block, Gandhi Vihar, Gopalpur Village, Delhi, 110009, India"
                      edit
                    />
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...ProfileActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfileScreen);
