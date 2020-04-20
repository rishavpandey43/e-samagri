import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Card,
  Text,
  Image,
  SearchBar,
  Button,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../styles/mainStyle';
import variables from '../../styles/variables';

class StoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    const Item = ({category}) => {
      return (
        <View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{category}:</Text>
          </View>
          <TouchableOpacity
            style={[
              mainStyles.row,
              {
                marginTop: 10,
                marginBottom: 10,
                paddingTop: 10,
                paddingBottom: 10,
              },
            ]}
            onPress={() => {
              this.props.navigation.navigate('item-screen');
            }}>
            <View
              style={[
                mainStyles.col8,
                {justifyContent: 'center', marginTop: 10},
              ]}>
              <Text style={{fontSize: 18}}>Kurkure Masala Munch</Text>
              <Text style={{fontSize: 15, color: '#6a6a6a'}}>₹ 25/ 400 gm</Text>
            </View>
            <View style={mainStyles.col4}>
              <View style={[mainStyles.row, {marginTop: 15}]}>
                <View style={mainStyles.col4}>
                  <Button
                    type="outline"
                    buttonStyle={styles.btn}
                    title="-"
                    onPress={() => {
                      console.log('button click');
                    }}
                    titleStyle={{color: variables.mainThemeColor}}
                  />
                </View>
                <View
                  style={[
                    mainStyles.col4,
                    {
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    },
                  ]}>
                  <Text>1</Text>
                </View>
                <View style={mainStyles.col4}>
                  <Button
                    type="outline"
                    buttonStyle={styles.btn}
                    title="+"
                    onPress={() => {
                      console.log('button click');
                    }}
                    titleStyle={{color: variables.mainThemeColor}}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

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
            text: 'Seller 1 Store',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              name="shopping-basket"
              size={20}
              color="#FFF"
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
          <View style={[mainStyles.container, {padding: 10}]}>
            <View style={[mainStyles.row, {marginTop: 10}]}>
              <View style={mainStyles.col4}>
                <Image
                  source={{uri: 'https://via.placeholder.com/100'}}
                  style={{width: 100, height: 100}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={mainStyles.col8}>
                <Text style={{fontSize: 20}}>
                  Dummy Address, wertg345, 123456, IN
                </Text>
                <View style={[mainStyles.row, {marginTop: 10}]}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Status:
                  </Text>
                  <Text style={{fontSize: 18, color: 'green', paddingLeft: 10}}>
                    Operation
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderBottomColor: '#aaa',
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}>
              <SearchBar
                placeholder="Search in Seller 1 Store..."
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
            <View
              style={{
                marginTop: 10,
                borderBottomColor: '#aaa',
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}>
              <Text style={{fontSize: 18}}>Sort by categories</Text>
              <View style={mainStyles.row}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[styles.categoryTag, styles.selected]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Dairy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Bakery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Dairy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.categoryTag}>Bakery</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <View>
                <Item category="All" />
                <Item category="Bakery" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryTag: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: variables.mainThemeColor,
    color: variables.mainThemeColor,
    margin: 5,
    minWidth: 50,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: variables.mainThemeColor,
    color: '#fff',
  },
  btn: {
    height: 'auto',
    width: '150%',
    borderRadius: 5,
    borderColor: variables.mainThemeColor,
  },
});

export default StoreScreen;
