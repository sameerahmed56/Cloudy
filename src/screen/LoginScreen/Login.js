import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animation,
} from 'react-native';
import color from '../../constants/colors';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import {MyContext} from '../../navigation/AppNavigation';
import {postRequest, getRequest} from '../../services/APIRequest';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      snackbarVisibility: false,
      snackbarMsg: '',
      showPassword: false,
    };
  }

  startLogin = async login => {
    setTimeout(login, 800);
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: color.WHITE,
          flex: 1,
          minHeight: DEVICE_HEIGHT,
        }}>
        <View
          style={{
            backgroundColor: color.WHITE,
            elevation: 15,
            alignSelf: 'flex-start',
            borderRadius: 25,
            marginLeft: 30,
            marginTop: 40,
          }}>
          <Entypo name={'chevron-left'} color={color.BLACK} size={35} />
        </View>
        <View style={{height: 10, marginVertical: 50}}></View>
        <View style={{width: DEVICE_WIDTH}}>
          <View
            ref={ref => {
              this.username = ref;
            }}>
            <View style={{...styles.textInputContainer}}>
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  color: color.TEXT_PRIMARY,
                  paddingLeft: 15,
                  fontSize: 15,
                  color: color.BLACK,
                }}
                underlineColor={color.THEME_ORANGE}
                placeholder="Enter Employee ID"
                value={this.state.username}
                placeholderTextColor={color.BORDER}
                onChangeText={username => {
                  this.setState({username});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({username: ''});
                }}>
                {this.state.username != '' && (
                  <Icon
                    name="close-thick"
                    size={19}
                    style={{paddingRight: 10, paddingVertical: 15}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            ref={ref => {
              this.password = ref;
            }}>
            <View style={{...styles.textInputContainer, marginTop: 20}}>
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  color: color.TEXT_PRIMARY,
                  paddingLeft: 15,
                  fontSize: 15,
                  color: color.BLACK,
                }}
                underlineColor={color.THEME_ORANGE}
                placeholder="Enter Password"
                // multiline={true}
                secureTextEntry={!this.state.showPassword}
                value={this.state.password}
                placeholderTextColor={color.BORDER}
                onChangeText={password => {
                  this.setState({password});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({showPassword: !this.state.showPassword});
                }}>
                {this.state.showPassword ? (
                  <Icon
                    name="eye-off"
                    color={color.THEME_ORANGE}
                    size={19}
                    style={{paddingRight: 10, paddingVertical: 15}}
                  />
                ) : (
                  <Icon
                    name="eye"
                    color={color.THEME_ORANGE}
                    size={19}
                    style={{paddingRight: 10, paddingVertical: 15}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{color: color.GREY, fontSize: 18}}>
              ---------OR---------
            </Text>
          </View>
          <View
            style={{width: DEVICE_WIDTH, alignItems: 'center', marginTop: 34}}>
            <MyContext.Consumer>
              {value => (
                <TouchableOpacity
                  onPress={() => {
                    this.startLogin(value);
                  }}
                  style={{
                    backgroundColor: color.THEME_ORANGE,
                    width: DEVICE_WIDTH - 84,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 54,
                    borderRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: color.WHITE,
                      fontSize: 22,
                      fontWeight: 'bold',
                    }}>
                    LOG IN
                  </Text>
                </TouchableOpacity>
              )}
            </MyContext.Consumer>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 34,
          }}>
          <Text style={{color: color.GREY, fontSize: 16}}>New User?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <Text style={{color: color.THEME_ORANGE, fontSize: 16}}>
              Create new Account
            </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{
            backgroundColor: color.WHITE,
            marginBottom: 10,
            borderRadius: 5,
          }}
          duration={4000}
          onDismiss={() => this.setState({snackbarVisibility: false})}
          action={{
            label: 'Ok',
            color: color.THEME_ORANGE,
            onPress: () => {
              this.setState({snackbarVisibility: false});
            },
          }}>
          <Text style={{color: color.THEME_ORANGE, fontSize: 15}}>
            {this.state.snackbarMsg}
          </Text>
        </Snackbar>
      </ScrollView>
    );
  }
}

export default Login;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
  },
  viewPager: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    borderRadius: 20,
    paddingLeft: 25,
    // shadowColor: '#000000',
    margin: 10,
    marginHorizontal: 20,
    // elevation:10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // borderBottomWidth:0,
    marginTop: 20,
    borderColor: color.THEME_ORANGE,
    // backgroundColor:color.TEXT_SECONDARY,
    borderWidth: 1,
    borderTopRightRadius: 0,
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: 10,
    color: color.TEXT_PRIMARY,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 15,
    alignItems: 'center',
    // elevation: 5,
    backgroundColor: color.BACKGROUND,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.THEME_ORANGE,
  },
});
