import React, {useState} from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  MaskedViewIOS,
} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import color from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Video from 'react-native-video';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      showAlert: false,
      alertMsg: '',
      alertTitle: '',
      biometryType: null,
      background: '',
      authenticate: false,
      animationImgColor: new Animated.Value(0),
      animationBackgroundColor: new Animated.Value(0),
      animationK: new Animated.Value(0),
      animationHeight: new Animated.Value(DeviceHeight),
      animationWidth: new Animated.Value(DeviceWidth),
      animationImage: new Animated.Value(0),
      animationKAKSHA: new Animated.Value(0),
      animationKIET: new Animated.Value(0),
      loadingProgress: new Animated.Value(0),
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.fetchData();
    }, 100);
    // this.moveImageUp()
    // this.moveImageDown()
    // this.fadeInOutK()
    // if (this.state.authenticate == false) {
    //     this.touchIdSupport()
    // }
    // else {
    //     this.fadeInHeight()
    //     this.fadeInWidth()
    // }
    Animated.timing(this.state.loadingProgress, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.loadingProgress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(() => {
        this.fetchData();
      });
    });
  }
  fetchData = () => {
    //api to request data
    this.props.complete();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.WHITE,
          alignItems: 'center',
          padding: 1,
        }}>
        <Video
          source={require('../../assets/splash_loader.mp4')}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          muted={true}
          repeat={false}
          resizeMode="cover"
        />
        <Snackbar
          duration={4000}
          visible={this.state.snackbarVisibility}
          onDismiss={() => {
            this.setState({snackbarVisibility: false});
            this.checkFingerPrint();
          }}
          action={{
            label: 'OKAY',
            onPress: () => {
              this.setState({snackbarVisibility: false});
              this.checkFingerPrint();
            },
          }}>
          {this.state.snackbarMsg}
        </Snackbar>
      </View>
    );
  }
}
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export const isLoggedIn = async () => {
  let cookie = await AsyncStorage.getItem(storageKeys.COOKIE);
  if (cookie) {
    return true;
  } else {
    return false;
  }
};
