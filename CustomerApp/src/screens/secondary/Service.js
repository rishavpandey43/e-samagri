// * Import required modules/dependencies
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Header,
  Card,
  Text,
  Button,
  SearchBar,
  Badge,
  Icon,
} from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

// * Import all store related stuffs
import * as AuthActions from '../../store/actions/creators/AuthActions';
import * as HomeActions from '../../store/actions/creators/HomeActions';
import * as ProfileActions from '../../store/actions/creators/ProfileActions';
import * as StoreActions from '../../store/actions/creators/StoreActions';
import * as CartActions from '../../store/actions/creators/CartActions';
import * as OrderActions from '../../store/actions/creators/OrderActions';

// * Import all screens/components
import Store from '../../components/Store';

// * Import utilites
import {getShopType} from '../../utils/helper';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class ServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopType: this.props.route.params.shopType,
      storeList: this.props.sellers.sellers,
      search: '',
    };
  }

  componentDidMount() {
    this.props.getSellersFetch(
      this.props.route.params.shopType,
      this.props.auth.authToken,
    );
  }

  componentDidUpdate(prevProps) {
    // If user has logged in first time, redirect to update profile screen for filling up address.
    if (this.props.profile.profile) {
      if (!this.props.profile.profile.address) {
        this.props.navigation.navigate('update-profile-screen');
      }

      if (
        prevProps.sellers.sellers.length != this.props.sellers.sellers.length
      ) {
        this.setState({storeList: this.props.sellers.sellers});
      }
    }
  }

  searchStore = search => {
    if (this.state.storeList) {
      this.setState({
        storeList: this.props.sellers.sellers.filter(
          seller =>
            seller.storeDetail.name
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1,
        ),
      });
    }
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              type="font-awesome"
              name="bars"
              size={20}
              color="#FFF"
              underlayColor="transparent"
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={{
            text: `Hello ${
              this.props.profile.profile
                ? this.props.profile.profile.personalDetail.firstName +
                  ' ' +
                  this.props.profile.profile.personalDetail.lastName
                : ''
            }`,
            style: {color: '#fff'},
          }}
          rightComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('cart-screen');
                }}
                style={mainStyles.row}>
                <Icon
                  type="font-awesome"
                  name="shopping-basket"
                  color="#FFF"
                  size={25}
                />
                <Badge
                  value={
                    this.props.cart.cart
                      ? this.props.cart.cart.products.reduce(
                          (acc, cur) => acc + cur.quantity,
                          0,
                        )
                      : 0
                  }
                  badgeStyle={{backgroundColor: variables.mainThemeColor}}
                  containerStyle={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                  }}
                />
              </TouchableOpacity>
            </View>
          }
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          {this.props.sellers.fetchingSellers ? (
            <View
              style={{
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : this.props.sellers.errMessage || !this.props.sellers.sellers ? (
            <Card title="Error Message" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                {this.props.sellers.errMessage || 'Internal Server Error'}
              </Text>
              <Button
                title="Retry"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
                onPress={() => {
                  this.props.getSellersFetch(this.props.auth.authToken);
                }}
              />
            </Card>
          ) : this.props.profile.profile &&
            !this.props.profile.profile.address ? (
            <Card title="Alert" containerStyle={{alignItems: 'center'}}>
              <Text style={{marginBottom: 20, fontSize: 20, color: 'red'}}>
                You haven't added your adddress, update your adddress to
                continue
              </Text>
              <Button
                title="Update now"
                type="outline"
                titleStyle={{color: variables.mainThemeColor}}
                buttonStyle={mainStyles.outlineBtn}
                onPress={() => {
                  this.props.navigation.navigate('update-profile-screen');
                }}
              />
            </Card>
          ) : (this.state.shopType === 1 &&
              !this.props.profile.profile.profileVerificationDetail) ||
            (this.props.profile.profile.profileVerificationDetail &&
              this.props.profile.profile.profileVerificationDetail
                .verification != 'ver') ? (
            <View style={{padding: 10}}>
              <Text h4 h4Style={{marginTop: 20, textAlign: 'center'}}>
                Your age must be of Legal Drinking Age to order liquor online.
              </Text>

              <Button
                title="Start your verification now"
                buttonStyle={{marginTop: 20}}
              />
            </View>
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <View>
                <SearchBar
                  placeholder="Search for shops..."
                  onChangeText={search => {
                    this.setState({
                      search,
                    });
                    this.searchStore(search);
                  }}
                  value={this.state.search}
                  lightTheme
                  round
                  showLoading={false}
                  containerStyle={{backgroundColor: 'transparent'}}
                  inputContainerStyle={{backgroundColor: 'transparent'}}
                />
              </View>
              <View style={{margin: 10}}>
                <Text h4>
                  All {`${getShopType(this.state.shopType)}s`} near you
                </Text>
                {this.props.sellers.sellers.length === 0 ? (
                  <View style={{margin: 15, marginTop: 30}}>
                    <Text style={{fontSize: 18}}>
                      We're not serving in your area currently, please change
                      your address and try again later.
                    </Text>
                  </View>
                ) : null}
                {this.state.storeList.map(store => (
                  <Store
                    key={store._id}
                    currentStore={store}
                    navigation={this.props.navigation}
                  />
                ))}
              </View>
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
    auth: state.auth,
    profile: state.profile,
    cart: state.cart,
    sellers: state.sellers,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...AuthActions,
      ...HomeActions,
      ...ProfileActions,
      ...StoreActions,
      ...CartActions,
      ...OrderActions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceScreen);
