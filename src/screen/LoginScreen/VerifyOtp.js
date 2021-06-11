import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import color from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/colors';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
class VerifyOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      otpStatus: '0',
    };
  }
  componentDidMount() {}
  setData = async () => {};
  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.WHITE}}>
        <TouchableOpacity
          style={{
            backgroundColor: color.WHITE,
            elevation: 15,
            alignSelf: 'flex-start',
            borderRadius: 25,
            marginLeft: 30,
            marginTop: 40,
            marginBottom: 40,
          }}
          onPress={() => {
            this.props.navigation.navigate('Signup');
          }}>
          <Entypo name={'chevron-left'} color={color.BLACK} size={35} />
        </TouchableOpacity>
        <ScrollView>
          <View style={{marginHorizontal: 30}}>
            <Text style={{color: color.BLACK, fontSize: 18}}>Verification</Text>
            <Text style={{color: color.THEME_ORANGE, fontSize: 18}}>
              We sent you an SMS code
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: color.BLACK, fontSize: 18}}>
                on number:{' '}
              </Text>
              <Text style={{color: color.THEME_ORANGE, fontSize: 18}}>
                {' '}
                +1 (458) 555 9895
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 60}}>
            <CodeField
              // ref={ref}
              value={this.state.otpValue}
              onChangeText={otpValue => {
                this.setState({otpValue});
              }}
              cellCount={4}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View
            style={{
              marginHorizontal: 30,
              marginTop: 30,
              flexDirection: 'row',
            }}>
            <Text style={{color: color.THEME_ORANGE, fontSize: 18}}>
              0.27 Sec
            </Text>
            <Text style={{color: color.GREY, fontSize: 18}}>
              {' '}
              | Could Not Received?
            </Text>
          </View>
          <Text
            style={{
              marginHorizontal: 30,
              color: color.THEME_ORANGE,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Resend Code
          </Text>
        </ScrollView>
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
      </View>
    );
  }
}

export default VerifyOtp;
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: color.LIGHT_GREY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: color.THEME_ORANGE,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
