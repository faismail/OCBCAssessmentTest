import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {

  const cek = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      navigation.replace('Homescreen')
    } else {
      navigation.replace('StartedPage')
    }
  };
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.replace('Login');
    // }, 2000);
    cek()
  });
  return (
      <ActivityIndicator color="red" size="large" style={{ flex:1, justifyContent:'center' }}></ActivityIndicator>
  );
};


export default Splash;
