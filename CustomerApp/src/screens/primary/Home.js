import React, {Component} from 'react';
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

import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    const Store = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('store-screen');
          }}>
          <View style={[mainStyles.row, {marginTop: 10, marginBottom: 10}]}>
            <View style={mainStyles.col4}>
              <Image
                source={{uri: 'https://via.placeholder.com/100'}}
                style={{width: 100, height: 100}}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={mainStyles.col8}>
              <Text style={{fontSize: 18}}>Sellet Store 1</Text>
              <Text style={{color: '#555'}}>
                Dummy Address, ksbc,1234, dto, In, 822112
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

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
            text: 'Hello Rishav Pandey',
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
          <View style={[mainStyles.container, {marginBottom: 100}]}>
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
            <View>
              <Text h4>All Stores</Text>
            </View>
            <Store />
            <Store />
            <Store />
            <Store />
            <Store />
            <Store />
            <Store />
            <Store />
            <Store />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
