import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";
import storageKeys from "../constants/storageKeys";
import AsyncStorage from '@react-native-community/async-storage';
import store from '../redux/store'
import {newNotification} from '../redux/actions'

export const checkPermission = async() => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
        return true
    } else {
        return false
    }
}

export const requestPermission = async() => {
    try {
        await messaging().requestPermission();
        // User has authorised
        return true
    } catch (error) {
        // User has rejected permissions
        return false
    }
}

export const getToken = async() => {
    fcmToken = await messaging().getToken();
    return fcmToken
}

export const foregroundMessage = async(remoteMessage) => {
    let notificationData = saveNotification(remoteMessage)
    let state = store.getState().reducer.newNotification.count
    let obj = {count:state+1,data:notificationData}
    await store.dispatch(newNotification(obj))
}

export const backgroundMessage = (remoteMessage) => {
    saveNotification(remoteMessage)

}
 
const saveNotification = async(remoteMessage) => {
    let oldNotification = await AsyncStorage.getItem(storageKeys.NEW_NOTIFICATION)
    oldNotification = await JSON.parse(oldNotification)
    if(oldNotification){
        await AsyncStorage.setItem(storageKeys.NEW_NOTIFICATION,JSON.stringify(oldNotification+1))
    }else{
        await AsyncStorage.setItem(storageKeys.NEW_NOTIFICATION,JSON.stringify(1))
    }
    let formData = JSON.parse(remoteMessage.data.data)
    // console.log(JSON.parse(data.data).title)    //form
    // console.log(data)   //POSTMAN

    let date = new Date(); 
    let timestamp = await date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear() // +'/'+date.getDay()
    let data = {
        body:formData.message,
        title:formData.title,
        goToLink:formData.goToLink,
        imageUrl:formData.imageUrl,
        timeStamp:timestamp
    }
    
    let previousData = await AsyncStorage.getItem(storageKeys.NOTIFICATION_DATA)
    previousData=JSON.parse(previousData)
    if(!previousData){
        let notificationArray = []
        notificationArray.push(data)
        await AsyncStorage.setItem(storageKeys.NOTIFICATION_DATA,JSON.stringify(notificationArray))
        return notificationArray
    }else{
        let notificationArray = []
        notificationArray = [...previousData,data]
        await AsyncStorage.setItem(storageKeys.NOTIFICATION_DATA,JSON.stringify(notificationArray))
        return notificationArray
    }
    

}

function handleData(){
	const obj = {
		title:title,
		message:message,
		is_background:is_background,
		image:image,
		timeStamp:timeStamp,
		payload:payload,
		goToLink:goToLink,
	}
}
export const sendNotification = ()=>{
    PushNotification.localNotification({
        /* Android Only Properties */
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        color: "#e47948", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 200, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        importance: "low", // (optional) set notification importance, default: high
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
       
        /* iOS only properties */
        alertAction: "view", // (optional) default: view
        category: "", // (optional) default: empty string
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
       
        /* iOS and Android properties */
        title: "My Notification Title", // (optional)
        message: "My Notification Message", // (required)
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
}

export const clickNotification = () =>{
    PushNotification.popInitialNotification(()=>{
        //called when notification is clicked
    })
}

export const configureNotification =()=>{

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      
    },
   
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
   
      // process the notification
   
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
   
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
   
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
   
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
}