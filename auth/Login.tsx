import {SafeAreaView, StatusBar, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loggedIn} from '../App';
import React from 'react';
import {useState} from '@hookstate/core';
import {Button} from '@rneui/themed';

export const LoginScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const text = useState('');
  const loggedInLocal = useState(loggedIn);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput
        placeholder={'Email'}
        onChangeText={text1 => text.set(text1)}
        value={text.get()}
      />
      <Button
        title={'Submit'}
        onPress={() => {
          console.log('press');
          loggedInLocal.set(true);
        }}
      />
    </SafeAreaView>
  );
};
