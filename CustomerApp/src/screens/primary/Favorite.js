import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Header, Image, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: true,
    };
  }

  removeFavorite = () => {};

  render() {
    const favoriteStore = () => {
      return (
        <View style={[mainStyles.row, {marginTop: 10, marginBottom: 10}]}>
          <View style={mainStyles.col3}>
            <Image
              source={{uri: 'https://via.placeholder.com/100'}}
              style={{width: '100%', height: '100%'}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={mainStyles.col7}>
            <View>
              <Text style={{fontSize: 18}}>Sellet Store 1</Text>
              <Text style={{color: '#555'}}>
                Dummy Address, ksbc,1234, dto, In
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Button title="Shop from this store" type="outline" />
            </View>
          </View>
          <View
            style={[
              mainStyles.col2,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Icon
              name={`${this.state.favorite ? 'heart' : 'heart-o'}`}
              size={25}
              onPress={() => {}}
              color={variables.mainThemeColor}
            />
          </View>
        </View>
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
            text: 'My Favorite Stores',
            style: {color: '#fff'},
          }}
          rightComponent={<Icon name="heart" color="#FFF" size={30} />}
          containerStyle={{
            backgroundColor: '#933dd4',
            justifyContent: 'space-around',
          }}
        />
        <ScrollView>
          <View style={[mainStyles.container, {marginBottom: 100}]}>
            {favoriteStore()}
            {favoriteStore()}
            {favoriteStore()}
            {favoriteStore()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default FavoriteScreen;
