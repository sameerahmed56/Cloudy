import React, {PureComponent} from 'react';
import {View, Text, Dimensions} from 'react-native';
import color from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: {},
    };
  }
  componentDidMount() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Mirzapur,In&appid=aec223ee0ee919608e9076325e42f609',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result:', result);
        this.setState({currentWeather: result});
      })
      .catch(error => console.log('error', error));
  }
  render() {
    const {currentWeather} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: color.WHITE}}>
        <Text
          style={{
            paddingLeft: 20,
            fontSize: 22,
            paddingVertical: 15,
            letterSpacing: 2,
            color: color.TEXT_PRIMARY,
            fontWeight: 'bold',
          }}>
          Mirzapur, UP
        </Text>
        <View style={{flex: 1, backgroundColor: color.WHITE}}>
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 24,
              paddingTop: 20,
              letterSpacing: 2,
              color: color.TEXT_SECONDARY,
              fontWeight: 'bold',
            }}>
            Today
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingLeft: 20,
                fontSize: 44,
                paddingTop: 20,
                letterSpacing: 2,
                color: color.TEXT_PRIMARY,
                fontWeight: 'bold',
              }}>
              {currentWeather.base != undefined
                ? parseInt(currentWeather.main.temp - 273.14)
                : '0'}
            </Text>
            <Icon
              name="temperature-celsius"
              size={32}
              style={{color: color.TEXT_PRIMARY, marginTop: 20}}
            />
          </View>
          <View style={{marginLeft: 20, marginVertical: 10}}>
            <Text
              style={{
                color: color.TEXT_PRIMARY,
                fontSize: 24,
                fontWeight: 'bold',
                backgroundColor: color.THEME_LIGHT_ORANGE,
                paddingVertical: 5,
                paddingHorizontal: 6,
                borderRadius: 15,
                alignSelf: 'flex-start',
              }}>
              {currentWeather.base != undefined
                ? currentWeather.weather[0].description
                    .charAt(0)
                    .toUpperCase() +
                  currentWeather.weather[0].description.slice(1)
                : '0'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              paddingVertical: 5,
            }}>
            <View
              style={{
                flex: 1 / 2,
                height: 100,
                backgroundColor: color.WHITE,
                borderRadius: 8,
                marginLeft: 15,
                marginRight: 10,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.TEXT_PRIMARY, fontSize: 17}}>
                Humidity
              </Text>
              <Text
                style={{
                  color: color.THEME_ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                {currentWeather.main != undefined
                  ? currentWeather.main.humidity + ' %'
                  : '0 %'}
              </Text>
            </View>
            <View
              style={{
                flex: 1 / 2,
                height: 100,
                backgroundColor: color.WHITE,
                borderRadius: 8,
                marginLeft: 10,
                marginRight: 15,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.TEXT_PRIMARY, fontSize: 17}}>
                Pressure
              </Text>
              <Text
                style={{
                  color: color.THEME_ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                {currentWeather.main != undefined
                  ? currentWeather.main.pressure + ' mBar'
                  : '0 mBar'}
              </Text>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 15, paddingVertical: 5}}>
            <View
              style={{
                flex: 1 / 2,
                height: 100,
                backgroundColor: color.WHITE,
                borderRadius: 8,
                marginLeft: 15,
                marginRight: 10,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.TEXT_PRIMARY, fontSize: 17}}>
                Wind
              </Text>
              <Text
                style={{
                  color: color.THEME_ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                {currentWeather.main != undefined
                  ? currentWeather.wind.speed + ' km/h'
                  : '0 km/h'}
              </Text>
            </View>
            <View
              style={{
                flex: 1 / 2,
                height: 100,
                backgroundColor: color.WHITE,
                borderRadius: 8,
                marginLeft: 10,
                marginRight: 15,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.TEXT_PRIMARY, fontSize: 17}}>
                Visibility
              </Text>
              <Text
                style={{
                  color: color.THEME_ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                {currentWeather.main != undefined
                  ? currentWeather.visibility + ' metre'
                  : '0 metre'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
