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
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// * Import all store related stuffs
import * as HomeActions from '../../store/actions/creators/HomeActions';
import * as ProfileActions from '../../store/actions/creators/ProfileActions';
import * as StoreActions from '../../store/actions/creators/StoreActions';

// * Import all screens/components
import Store from '../../components/Store';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeList: this.props.sellers.sellers,
      search: '',
    };
  }

  componentDidMount() {
    this.props.getProfileFetch();
    this.props.getSellersFetch();
  }

  componentDidUpdate(prevProps) {
    // * checks previous sellerlist with new received ASYNC seller list
    if (prevProps.sellers.sellers.length != this.props.sellers.sellers.length) {
      this.setState({storeList: this.props.sellers.sellers});
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
              name="bars"
              size={20}
              color="#FFF"
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
            <Icon
              name="shopping-basket"
              color="#FFF"
              size={25}
              onPress={() => {
                this.props.navigation.navigate('cart-screen');
              }}
            />
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
                  this.props.getProfileFetch();
                  this.props.getSellersFetch();
                }}
              />
            </Card>
          ) : (
            <View style={[mainStyles.container, {marginBottom: 100}]}>
              <View>
                <SearchBar
                  placeholder="Search for stores..."
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
                <Text h4>All stores near you</Text>
                {this.state.storeList.map(seller => (
                  <Store
                    key={seller._id}
                    currentStore={seller}
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
    profile: state.profile,
    sellers: state.sellers,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {...HomeActions, ...ProfileActions, ...StoreActions},
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
