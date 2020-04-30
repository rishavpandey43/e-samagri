// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Header, Card, Button, Text, Icon} from 'react-native-elements';

// * Import all store related stuffs
import * as ProfileActions from '../../store/actions/creators/ProfileActions';

// * Import all screens/components
import CardCustomTitle from '../../components/CardCustomTitle';

// * Import utilites

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

import * as helper from '../../utils/helper';
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
              type="font-awesome"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: 'My Profile',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon name="user" type="font-awesome" color="#FFF" size={30} />
          }
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
              <View style={styles.profileImg}>
                <Text h3>
                  {this.props.profile.profile.personalDetail.firstName +
                    ' ' +
                    this.props.profile.profile.personalDetail.lastName}
                </Text>
              </View>
              <View>
                <Card
                  title={
                    <CardCustomTitle
                      title="Personal Detail"
                      type="edit"
                      onPress={() => {
                        this.props.navigation.navigate('edit-profile-screen');
                      }}
                    />
                  }>
                  <View style={mainStyles.infoGroup}>
                    <View style={mainStyles.labelGroup}>
                      <Icon
                        name="user"
                        type="font-awesome"
                        color={variables.mainThemeColor}
                        size={20}
                        containerStyle={styles.marginRight}
                      />
                      <Text style={mainStyles.labelText}>Owner Name:</Text>
                    </View>
                    <View>
                      <Text style={mainStyles.value}>
                        {this.props.profile.profile.personalDetail.firstName +
                          ' ' +
                          this.props.profile.profile.personalDetail.lastName}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={mainStyles.infoGroup}>
                    <View style={mainStyles.labelGroup}>
                      <Icon
                        name="envelope"
                        type="font-awesome"
                        color={variables.mainThemeColor}
                        size={20}
                        containerStyle={styles.marginRight}
                      />
                      <Text style={mainStyles.labelText}>Email:</Text>
                    </View>
                    <View>
                      <Text style={mainStyles.value}>
                        {this.props.profile.profile.personalDetail.email}
                      </Text>
                    </View>
                  </View> */}

                  <View style={mainStyles.infoGroup}>
                    <View style={mainStyles.labelGroup}>
                      <Icon
                        name="phone"
                        type="font-awesome"
                        color={variables.mainThemeColor}
                        size={20}
                        containerStyle={styles.marginRight}
                      />
                      <Text style={mainStyles.labelText}>Mobile number:</Text>
                    </View>
                    <View>
                      <Text style={mainStyles.value}>
                        {this.props.profile.profile.personalDetail.phone}
                      </Text>
                    </View>
                  </View>
                </Card>

                <Card
                  title={
                    <CardCustomTitle
                      title="Store Detail"
                      type="edit"
                      detail={this.props.profile.profile.storeDetail}
                      onPress={() => {
                        this.props.navigation.navigate('edit-profile-screen');
                      }}
                    />
                  }>
                  {!this.props.profile.profile.storeDetail ? (
                    <View style={{alignItems: 'center'}}>
                      <Text style={{margin: 10}}>No Store added</Text>
                      <Button
                        title="Add your store"
                        type="outline"
                        titleStyle={{color: variables.mainThemeColor}}
                        buttonStyle={mainStyles.outlineBtn}
                        onPress={() => {
                          this.props.navigation.navigate('edit-profile-screen');
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="shopping-cart"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>Store Name:</Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.storeDetail.name}
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="map-marker"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>
                            Store Address:
                          </Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {helper.obtainAddressInString(
                              this.props.profile.profile.storeDetail.address,
                            )}
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="file-o"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>
                            PAN Card number:
                          </Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.storeDetail.panCard}
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="file-o"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>GST number:</Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.storeDetail.gstNumber}
                          </Text>
                        </View>
                      </View>
                      <View style={mainStyles.row}>
                        <View style={{flex: 1}}>
                          <Text h4>Status:</Text>
                        </View>
                        <View style={{flex: 1}}>
                          {this.props.profile.profile.storeDetail.verified ? (
                            <Text h4 style={{color: 'green', marginLeft: 10}}>
                              Verified
                            </Text>
                          ) : (
                            <Text h4 style={{color: 'red', marginLeft: 10}}>
                              Not Verified
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                </Card>

                <Card
                  title={
                    <CardCustomTitle
                      title="Bank Account Detail"
                      type="edit"
                      detail={this.props.profile.profile.bankDetail}
                      onPress={() => {
                        this.props.navigation.navigate('edit-profile-screen');
                      }}
                    />
                  }>
                  {!this.props.profile.profile.bankDetail ? (
                    <View style={{alignItems: 'center'}}>
                      <Text style={{margin: 10}}>No Bank detail added</Text>
                      <Button
                        title="Add your bank detail"
                        type="outline"
                        titleStyle={{color: variables.mainThemeColor}}
                        buttonStyle={mainStyles.outlineBtn}
                        onPress={() => {
                          this.props.navigation.navigate('edit-profile-screen');
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="bank"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>Bank Name:</Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.bankDetail.name}
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="credit-card"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>
                            Account number:
                          </Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {
                              this.props.profile.profile.bankDetail
                                .accountNumber
                            }
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="file-o"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>IFSC code:</Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.bankDetail.ifscCode}
                          </Text>
                        </View>
                      </View>

                      <View style={mainStyles.infoGroup}>
                        <View style={mainStyles.labelGroup}>
                          <Icon
                            name="file-o"
                            type="font-awesome"
                            color={variables.mainThemeColor}
                            size={20}
                            containerStyle={styles.marginRight}
                          />
                          <Text style={mainStyles.labelText}>Branch Name:</Text>
                        </View>
                        <View>
                          <Text style={mainStyles.value}>
                            {this.props.profile.profile.bankDetail.branchName}
                          </Text>
                        </View>
                      </View>
                      <View style={mainStyles.row}>
                        <View style={{flex: 1}}>
                          <Text h4>Status:</Text>
                        </View>
                        <View style={{flex: 1}}>
                          {this.props.profile.profile.bankDetail.verified ? (
                            <Text h4 style={{color: 'green', marginLeft: 10}}>
                              Verified
                            </Text>
                          ) : (
                            <Text h4 style={{color: 'red', marginLeft: 10}}>
                              Not Verified
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                </Card>
              </View>
            </View>
          )}
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
)(ProfileScreen);
