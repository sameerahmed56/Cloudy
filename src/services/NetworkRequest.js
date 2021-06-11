import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../constants/storageKeys'
import RNFetchBlob from 'rn-fetch-blob';
import ApiUtils from '../utils/ApiUtils'

export async function getRequest(url = "", Cookie = "") {

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            Cookie: Cookie
        }
    });
    let responseJson = await response.json();
    return responseJson;
}


export async function postRequest(url = "", Cookie = "", body = {}) {

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            Cookie: Cookie
        },
        body: body
    });
    // let responseJson = await response.json();
    return response;
}


export async function putRequest(url = "", Cookie = "", body = {}) {
    let response = await fetch(url, {
        method: 'PUT',
        body: body,
        headers: {
            Cookie: Cookie
        }
    });
    let responseJson = await response.json();
    return responseJson;
}

export async function downloadFile(url = "", fileName, cookie) {
    const { fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    RNFetchBlob
        .config({
            trusty: true,
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: downloads + '/' + fileName,
            }
        })
        .fetch('POST    ', url, {
            Cookie: cookie
        })
        .then((res) => {
            // res
        }).catch(err => {
            // err handling
        })
}

export async function downloadIdCard(url = "", fileName, cookie) {
    const { fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    RNFetchBlob
        .config({
            trusty: true,
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: downloads + '/' + fileName,
            }
        })
        .fetch('POST', url, {
            Cookie: cookie,
        })
        .then(ApiUtils.checkStatus)
        .then(response => response.json())
        .catch(err => {
            // err handling
        })
}