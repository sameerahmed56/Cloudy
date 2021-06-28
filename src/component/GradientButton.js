import React, { useEffect } from 'react'
import { View, Text, TextInput, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, Animation} from 'react-native';
import color from '../constants/colors';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


export default function GradientButton({borderRadius, colorArray, MiddleComponent, paddingHorizontal, paddingVertical, btnWidth}) {
    return (
        <LinearGradient
          style={{borderRadius: borderRadius,width: btnWidth, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, justifyContent: 'center', alignItems: 'center',}}
          colors={colorArray}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
            <MiddleComponent/>
        </LinearGradient>
    )
}
