import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {useState} from '@hookstate/core';
import {EE1D} from './App';

export const EE1DCounterScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const ee1dState = useState(EE1D);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Usage Time: 5 Seconds</Text>
      <Text>Cooldown Time: {ee1dState.cooldown.get()} Seconds</Text>
      <Button
        disabled={ee1dState.cooldown.value !== 0 || ee1dState.uses.value === 0}
        title={`Uses Remaining: ${ee1dState.uses.get()}`}
        onPress={() => {
          // ee1dState.set(prevState => prevState - 1);
          ee1dState.uses.set(use => use - 1);
          ee1dState.cooldown.set(_ => 5);

          let intervalHandle = setInterval(() => {
            ee1dState.cooldown.set(left => left - 1);
            if (ee1dState.cooldown.value <= 0) {
              clearInterval(intervalHandle);
            }
          }, 1000);
        }}
      />
    </SafeAreaView>
  );
};
