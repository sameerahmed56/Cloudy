import React, {PureComponent} from 'react';
import {View, Text, Dimensions, ImageBackground, ScrollView, Platform, PermissionsAndroid} from 'react-native';
import color from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import DropDownComponent from '../../component/DropDownComponent';
import Geolocation from '@react-native-community/geolocation';
class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: {},
      cityList: [
        {label: 'Mirzapur', value: 'Mirzapur,In'},
        {label: 'Allahabad', value: 'Allahabad,In'},
        {label: 'Ghaziabad', value: 'Ghaziabad,In'},
        {label: 'Lucknow', value: 'Lucknow,In'}
      ],
      open: false,
      value: null,
      hours: 0,
      longitude: null,
      latitude: null,
      locationStatus: '',
      backgroundImage: {
          morning: require('../../assets/sunny-2.jpg'),
          noon: require('../../assets/sunny.jpg'),
          evening: require('../../assets/clouds.jpg'),
          night: require('../../assets/night-1.jpg')
        }
    };
  }
  componentDidMount() {
    this.getGeoLocationPermission()
    console.log("TIMESTAMP", Math.floor(Date.now() /1000))
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`)

    // how to handle the cases where time is one digit
    function makeTwoDigits (time) {
      const timeString = `${time}`;
      if (timeString.length === 2) return time
      return `0${time}`
    }
    console.log(`${makeTwoDigits(hours)}:${makeTwoDigits(minutes)}`)
    this.setState({hours: hours})
  }
  getGeoLocationPermission= async() =>{
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
      // this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
          // this.subscribeLocationLocation();
        } else {
          // this.setLocationStatus('Permission Denied');
          this.setState({locationStatus: 'Permission Denied'})
        }
      } catch (err) {
        console.warn(err);
      }
    }
    // this.requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }
  getOneTimeLocation = () => {
    this.setState({locationStatus: 'Getting Location ...'})
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      
      //Will give you the current location
      (position) => {
        // setLocationStatus('You are Here');
        console.log('working')
        this.setState({locationStatus: 'You Are Here'})
        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({latitude: currentLatitude, longitude: currentLongitude})
        console.log('currentLongitude:', currentLongitude)
        console.log('currentLatitude:', currentLatitude)
        // this.getDailyForecast(currentLatitude, currentLatitude, 5)
        // setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        // setCurrentLatitude(currentLatitude);
      },
      (error) => {
        // setLocationStatus(error.message);
        this.setState({locationStatus: error.msg})
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  

  setOpen(open) {
    this.setState({ 
      open
    });
    console.log(this.state.value)
  }
  setValue(callback) {
    this.setState(state => ({ 
      value: callback(state.value)
    }));
  }

  setCity(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }
  onChangeValue(value){
    console.log("value",value)
    this.getTodayWeatherData(value)
  }
  getTodayWeatherData = (cityName) =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q='+ cityName+ '&appid=aec223ee0ee919608e9076325e42f609',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result:', result);
        this.setState({currentWeather: result});
      })
      .catch(error => console.log('error', error));
  }
  getDailyForecast = (latitude, longitude, cnt) =>{
    console.log('wododododo')
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude+ '&cnt=' + cnt+ '&appid=aec223ee0ee919608e9076325e42f609',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('forecast:', result);
      })
      .catch(error => console.log('error', error));
  }
  render() {
    const {currentWeather} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: color.WHITE}}>
        <ImageBackground source={this.state.backgroundImage.noon} blurRadius={0} style={{height: DeviceHeight, width: DeviceWidth, }}>
        <View style={{marginVertical: 25,alignItems: 'center'}}>
          <DropDownComponent 
          dropDownWidth={DeviceWidth - 30} 
          open={this.state.open}
          value={this.state.value}
          onChangeValue={(e) => this.onChangeValue(e)}
          setOpen={ (e) => this.setOpen(e)}
          setValue={ (e) => this.setValue(e)}
          setItems={ (e) => this.setCity(e)}
          items={this.state.cityList} 
          placeholderTxt="Select City" 
          textSize={15} 
          upperContainerHeight={40}/>
        </View>
        <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
          {
            this.state.value === null ?
            <View>
              <Text
              style={{
                paddingLeft: 20,
                fontSize: 22,
                paddingVertical: 15,
                letterSpacing: 2,
                color: color.TEXT_PRIMARY,
                fontWeight: 'bold',
              }}>
                Select Any City
              </Text>
            </View>
            :
            <View>
              <Text
              style={{
                paddingLeft: 20,
                fontSize: 22,
                paddingVertical: 15,
                letterSpacing: 2,
                color: color.TEXT_PRIMARY,
                fontWeight: 'bold',
              }}>
              {this.state.value}
              </Text>
              <Text
                style={{
                  paddingLeft: 20,
                  fontSize: 24,
                  paddingTop: 10,
                  letterSpacing: 2,
                  color: color.TEXT_PRIMARY,
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
                    color: color.THEME_ORANGE,
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
                    color: color.TEXT_WHITE,
                    fontSize: 24,
                    fontWeight: 'bold',
                    backgroundColor: color.THEME_ORANGE,
                    paddingVertical: 5,
                    paddingHorizontal: 6,
                    borderRadius: 15,
                    alignSelf: 'flex-start',
                  }}>
                  {currentWeather.base != undefined
                    ? currentWeather.weather[0].main
                    : ' '}
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
          }
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default Home;
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
// subscribeLocationLocation = () => {
//   const watchID = Geolocation.watchPosition(
//     (position) => {
//       //Will give you the location on location change
      
//       // setLocationStatus('You are Here');
//       this.setState({locationStatus: 'you are here ...'})
//       console.log(position);

//       //getting the Longitude from the location json        
//       const currentLongitude =
//         JSON.stringify(position.coords.longitude);

//       //getting the Latitude from the location json
//       const currentLatitude = 
//         JSON.stringify(position.coords.latitude);

//       //Setting Longitude state
//       // setCurrentLongitude(currentLongitude);

//       //Setting Latitude state
//       // setCurrentLatitude(currentLatitude);
//       this.setState({latitude: currentLatitude, longitude: currentLongitude})
//     },
//     (error) => {
//       // setLocationStatus(error.message);
//       this.setState({locationStatus: error.msg})
//     },
//     {
//       enableHighAccuracy: false,
//       maximumAge: 1000
//     },
//   );
// };