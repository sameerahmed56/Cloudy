import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Animated,
  PanResponder,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import Home from '../screen/BottomNav/Home';
import Order from '../screen/BottomNav/Order';
import Recipe from '../screen/BottomNav/Recipe';
import Recurring from '../screen/BottomNav/Recurring';
import SplashScreen, {isLoggedIn} from '../screen/Splash/SplashScreen';
import Login from '../screen/LoginScreen/Login';
import Signup from '../screen/LoginScreen/Signup';
import VerifyOtp from '../screen/LoginScreen/VerifyOtp';

const SIZE = 80;
export default class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      LoggedIn: false,
    };
  }

  async componentDidMount() {}

  logout = async () => {
    let removeItem = [storageKeys.SAVED_CREDENTIALS]; //add key you don't want to delete on logout
    let keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < removeItem.length; i++) {
      keys.splice(keys.indexOf(removeItem[i]), 1);
    }
    await AsyncStorage.multiRemove(keys);
    this.setState({LoggedIn: false});
  };

  login = () => {
    this.setState({LoggedIn: true});
  };

  splashComplete = async () => {
    let loggedInStatus = await isLoggedIn();
    if (loggedInStatus) {
      this.setState({isLoading: false, LoggedIn: true});
    } else {
      this.setState({isLoading: false, LoggedIn: false});
    }
  };

  render() {
    const {isLoading, LoggedIn} = this.state;
    return (
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        {this.state.LoggedIn ? (
          <MyContext.Provider value={this.logout}>
            <View style={{flex: 1}}>
              <TabNavigator />
            </View>
          </MyContext.Provider>
        ) : (
          <MyContext.Provider value={this.login}>
            <LoginStack />
            {/* <TabNavigator /> */}
          </MyContext.Provider>
        )}
      </View>
    );
  }
}
const StackNavigator = createStackNavigator();

const LoginStack = props => (
  <StackNavigator.Navigator
    initialRouteName="Login"
    mode="modal"
    headerMode="none">
    <StackNavigator.Screen name="Login" component={Login} />
    <StackNavigator.Screen name="Signup" component={Signup} />
    <StackNavigator.Screen name="Verify Otp" component={VerifyOtp} />
  </StackNavigator.Navigator>
);
// const AccountStack = (props) => (
//     <StackNavigator.Navigator
//         initialRouteName="Account"
//         mode="card"
//         headerMode="none"
//     >
//         <StackNavigator.Screen name="Account" component={Account} />
//         <StackNavigator.Screen name="Profile" component={Profile} />
//         <StackNavigator.Screen name="Animated Pie Chart" component={AnimatedPieChart} />
//         <StackNavigator.Screen name="Notification" component={NotificationScreen} />
//         <StackNavigator.Screen name="Show Notification" component={ShowNotification} />
//     </StackNavigator.Navigator>

// )
const Tab = createBottomTabNavigator();
const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon = focused ? size + 7 : size;
          let colorIcon = focused ? colors.WHITE : colors.THEME_ORANGE; // 51b9db
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            return <Icon name={iconName} size={sizeIcon} color={colorIcon} />;
          } else if (route.name === 'Order') {
            iconName = focused ? 'food' : 'food';
            return <Icon name={iconName} size={sizeIcon} color={colorIcon} />;
          }
        },
      })}
      tabBarOptions={{
        // activeTintColor: colors.WHITE,
        keyboardHidesTabBar: true,
        activeBackgroundColor: colors.THEME_ORANGE, //60708d
        inactiveBackgroundColor: colors.WHITE, //00223d
        showLabel: false,
        adaptive: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
      {/* <Tab.Screen name="Recipe" component={Recipe} /> */}
      {/* <Tab.Screen name="Recurring" component={Recurring} /> */}
    </Tab.Navigator>
  );
};

export const MyContext = React.createContext(() => {
  //do nothing
});

//function to generate view for bottom nav bar icon with badge
function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <Animatable.View
      animation={badgeCount ? 'rubberBand' : ''}
      iterationCount={'infinite'}
      style={{width: size, height: size, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </Animatable.View>
  );
}
