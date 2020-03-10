import React, { Component } from 'react';
import Map from './src/screens/Map'
import { Platform, PermissionsAndroid } from 'react-native';

export async function request_location_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      Alert.alert("Location Permission Granted.");
    }
    else {

      Alert.alert("Location Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }
}

export default class App extends Component{
  async componentDidMount() {
    await request_location_runtime_permission()
  }

  render() {
        return <Map/>;
    }
}

