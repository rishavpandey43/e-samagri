import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Header, Card, Button, Text, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

import CardCustomTitle from '../../components/CardCustomTitle';

import * as ProfileActions from '../../store/actions/creators/ProfileActions';

import variables from '../../styles/variables';
import mainStyles from '../../styles/mainStyle';

class UpdateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalDetailCardDisplay: false,
      storeDetailCardDisplay: false,
      bankDetailCardDisplay: false,
      storeDetail: {
        name: '',
        address: {
          street: '',
          landmark: '',
          city: '',
          pincode: '',
        },
        panCard: '',
        gstNumber: '',
        // document: {
        //   name: '',
        //   url: '',
        // },
      },
      bankDetail: {
        name: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
      },
    };
  }

  toggleEditCardDisplay = target => {
    this.setState({[target]: !this.state[target]});
  };

  // TODO: Implement file upload functionality
  uploadDocument = async () => {
    // try {
    //   const results = await DocumentPicker.pickMultiple({
    //     type: [DocumentPicker.types.images],
    //   });
    //   let names = [];
    //   let uris = [];
    //   for (const res of results) {
    //     uris.push(res.uri);
    //     names.push(res.name);
    //   }
    //   this.setState({
    //     storeDetail: {
    //       ...this.state.storeDetail,
    //       document: {
    //         name: res.name,
    //         url: res.url,
    //       },
    //     },
    //   });
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     // User cancelled the picker, exit any dialogs or menus and move on
    //   } else {
    //     throw err;
    //   }
    // }
  };

  updateDetail = detailType => {
    let tempData = this.state[detailType];
    let isEmpty = false;
    for (const item in tempData) {
      if (typeof tempData[item] == 'string') {
        if (tempData[item] == '') {
          isEmpty = true;
        }
      } else {
        for (const key in tempData[item]) {
          if (tempData[item][key] == '') {
            isEmpty = true;
          }
        }
      }
    }
    if (isEmpty) {
      Alert.alert('Input Invalid', 'Please fill all the details to continue.');
      return;
    } else {
      let data =
        detailType !== 'personalDetail'
          ? {
              ...tempData,
              verified: false,
            }
          : {
              ...tempData,
            };
      this.props.updateProfileFetch(data, detailType);
    }
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
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
                    title="Edit Your Personal Detail"
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
                            storeDetail: {
                              name: '',
                              address: {
                                street: '',
                                landmark: '',
                                city: '',
                                pincode: '',
                              },
                              panCard: '',
                              gstNumber: '',
                              // document: {
                              //   name: '',
                              //   url: '',
                              // },
                            },
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
                    title="Edit Your Store Detail"
                    detail={this.props.profile.profile.personalDetail}
                    onPress={() => {
                      this.toggleEditCardDisplay('storeDetailCardDisplay');
                    }}
                  />
                }>
                <View
                  style={{
                    display: `${
                      this.state.storeDetailCardDisplay ? 'flex' : 'none'
                    }`,
                  }}>
                  <View>
                    <View style={mainStyles.formGroup}>
                      <Input
                        label="Store Name"
                        placeholder="Sangam General Store"
                        value={this.state.storeDetail.name}
                        onChangeText={name => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              name,
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        Address:
                      </Text>
                      <Input
                        label="Street"
                        placeholder="Panki Road"
                        value={this.state.storeDetail.address.street}
                        onChangeText={street => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              address: {
                                ...this.state.storeDetail.address,
                                street,
                              },
                            },
                          });
                        }}
                      />
                      <Input
                        label="Landmark"
                        placeholder="near NCC office"
                        value={this.state.storeDetail.address.landmark}
                        onChangeText={landmark => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              address: {
                                ...this.state.storeDetail.address,
                                landmark,
                              },
                            },
                          });
                        }}
                      />
                      <Input
                        label="City"
                        placeholder="Daltonganj"
                        value={this.state.storeDetail.address.city}
                        onChangeText={city => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              address: {
                                ...this.state.storeDetail.address,
                                city,
                              },
                            },
                          });
                        }}
                      />
                      <Input
                        label="Pincode"
                        placeholder="822134"
                        keyboardType="numeric"
                        value={this.state.storeDetail.address.pincode}
                        onChangeText={pincode => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              address: {
                                ...this.state.storeDetail.address,
                                pincode,
                              },
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Input
                        label="PAN Card Number"
                        placeholder="DNAPXXXX0J"
                        value={this.state.storeDetail.panCard}
                        onChangeText={panCard => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              panCard,
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Input
                        label="GST Number"
                        placeholder="36ARVPSXXXXF1ZF"
                        value={this.state.storeDetail.gstNumber}
                        onChangeText={gstNumber => {
                          this.setState({
                            storeDetail: {
                              ...this.state.storeDetail,
                              gstNumber,
                            },
                          });
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={[mainStyles.row, {marginBottom: 20}]}>
                      <View style={mainStyles.col6}>
                        <Button
                          title="Cancel"
                          titleStyle={{color: variables.mainThemeColor}}
                          type="outline"
                          buttonStyle={mainStyles.outlineBtn}
                          onPress={() => {
                            this.setState({
                              storeDetailCardDisplay: false,
                              storeDetail: {
                                name: '',
                                address: {
                                  street: '',
                                  landmark: '',
                                  city: '',
                                  pincode: '',
                                },
                                panCard: '',
                                gstNumber: '',
                                // document: {
                                //   name: '',
                                //   url: '',
                                // },
                              },
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
                            this.updateDetail('storeDetail');
                          }}
                          loading={this.props.profile.profileUpdating}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </Card>

              <Card
                title={
                  <CardCustomTitle
                    title="Edit Your Bank Detail"
                    detail={this.props.profile.profile.personalDetail}
                    onPress={() => {
                      this.toggleEditCardDisplay('bankDetailCardDisplay');
                    }}
                  />
                }>
                <View
                  style={{
                    display: `${
                      this.state.bankDetailCardDisplay ? 'flex' : 'none'
                    }`,
                  }}>
                  <View>
                    <View style={mainStyles.formGroup}>
                      <Input
                        label="Bank Name"
                        placeholder="State Bank of India"
                        value={this.state.bankDetail.name}
                        onChangeText={name => {
                          this.setState({
                            bankDetail: {
                              ...this.state.bankDetail,
                              name,
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Input
                        label="Account Number"
                        keyboardType="numeric"
                        placeholder="203XXXXXXX1"
                        value={this.state.bankDetail.accountNumber}
                        onChangeText={accountNumber => {
                          this.setState({
                            bankDetail: {
                              ...this.state.bankDetail,
                              accountNumber,
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Input
                        label="IFSC Code"
                        placeholder="SBXXXXXXX45"
                        value={this.state.bankDetail.ifscCode}
                        onChangeText={ifscCode => {
                          this.setState({
                            bankDetail: {
                              ...this.state.bankDetail,
                              ifscCode,
                            },
                          });
                        }}
                      />
                    </View>

                    <View style={mainStyles.formGroup}>
                      <Input
                        label="Branch Name"
                        placeholder="XYZ branch"
                        value={this.state.bankDetail.branchName}
                        onChangeText={branchName => {
                          this.setState({
                            bankDetail: {
                              ...this.state.bankDetail,
                              branchName,
                            },
                          });
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={[mainStyles.row, {marginBottom: 20}]}>
                      <View style={mainStyles.col6}>
                        <Button
                          title="Cancel"
                          titleStyle={{color: variables.mainThemeColor}}
                          type="outline"
                          buttonStyle={mainStyles.outlineBtn}
                          onPress={() => {
                            this.setState({
                              bankDetailCardDisplay: false,
                              bankDetail: {
                                name: '',
                                accountNumber: '',
                                ifscCode: '',
                                branchName: '',
                              },
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
                            this.updateDetail('bankDetail');
                          }}
                          loading={this.props.profile.profileUpdating}
                        />
                      </View>
                    </View>
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
