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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullName: '',
      email: '',
      snackbarVisibility: false,
      snackbarMsg: '',
      showPassword: false,
    };
  }

  startLogin = async login => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('X-API-KEY', 'ds89fdfvcb87gf8dfdg87fdghgjh897');
      myHeaders.append('Authorization', 'Basic YWRtaW46MTIzNA==');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'ci_session=a398d10df611ea4f9b475b8c6288fa3f2bafeb1a; csrf_cookie_name=7e603d783e505b02881156aad6d2988d',
      );

      var raw = JSON.stringify({
        email: this.state.email,
        pwd: this.state.email,
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://wethink.pw/test/test_login/', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result:', result);
          if (result.status == '0') {
            this.setState({
              snackbarMsg: result.message,
              snackbarVisibility: true,
            });
          } else {
            AsyncStorage.setItem(
              storageKeys.PROFILE_DATA,
              JSON.stringify(result.data),
            );
            setTimeout(login, 800);
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error:', error);
    }
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
              this.fullName = ref;
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
                placeholder="Full Name"
                value={this.state.fullName}
                placeholderTextColor={color.BORDER}
                onChangeText={fullName => {
                  this.setState({fullName});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({fullName: ''});
                }}>
                {this.state.fullName != '' && (
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
              this.email = ref;
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
                placeholder="Email"
                // multiline={true}
                value={this.state.email}
                placeholderTextColor={color.BORDER}
                onChangeText={email => {
                  this.setState({email});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({email: ''});
                }}>
                {this.state.email != '' && (
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              width: DEVICE_WIDTH - 30,
            }}>
            <View
              style={{
                marginTop: 15,
                alignItems: 'center',
                // elevation: 5,
                marginLeft: 30,
                backgroundColor: color.BACKGROUND,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: color.THEME_ORANGE,
                marginTop: 10,
                flex: 1 / 4,
                height: 60,
                marginRight: 5,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
                // elevation: 5,
                backgroundColor: color.BACKGROUND,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: color.THEME_ORANGE,
                marginTop: 10,
                flex: 1,
              }}>
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
                placeholder="(000) 000 0000"
                // multiline={true}
                value={this.state.email}
                placeholderTextColor={color.BORDER}
                onChangeText={email => {
                  this.setState({email});
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              style={{flex: 1 / 2, marginLeft: 30}}>
              <Text
                style={{
                  color: color.THEME_ORANGE,
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                Sign in?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1 / 2, alignSelf: 'flex-end'}}
              onPress={() => {
                this.props.navigation.navigate('Verify Otp');
              }}>
              <Entypo
                name={'chevron-small-right'}
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 30,
                  backgroundColor: color.THEME_ORANGE,
                  padding: 7,
                  borderRadius: 80,
                }}
                color={color.WHITE}
                size={45}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 34,
          }}>
          <Text style={{color: color.GREY, fontSize: 15}}>
            By signing in, you agree to all
          </Text>
          <View>
            <Text style={{color: color.THEME_ORANGE, fontSize: 15}}>
              Term & Conditions
            </Text>
          </View>
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

export default Signup;
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
