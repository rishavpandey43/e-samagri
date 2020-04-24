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
import * as ProfileActions from '../../store/actions/creators/ProfileActions';

// * Import all screens/components
import Store from '../../components/Store';

// * Import all styling stuffs
import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this.props.getProfileFetch();
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
            text: `Hello ${
              this.props.profile.profile
                ? this.props.profile.profile.firstName +
                  ' ' +
                  this.props.profile.profile.lastName
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
              <View>
                <SearchBar
                  placeholder="Search for stores or item..."
                  onChangeText={search => {
                    this.setState({
                      search,
                    });
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
                <Store navigation={this.props.navigation} />
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
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...ProfileActions}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
