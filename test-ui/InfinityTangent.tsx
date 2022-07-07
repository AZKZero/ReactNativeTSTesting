import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {FlexWrapper} from '../utils/FlexWrapper';
import {Button} from '@rneui/themed';

export const InfinityTangent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlexWrapper direction="column">
        <Button title={'The Jackdaw'} />
        <Button title={'The Aquila'} />
        <Button title={'The Morrigan'} />
        <Button title={'The Flying Dutchman'} />
        <Button title={"Queen Annie's Revenge"} />
      </FlexWrapper>
    </SafeAreaView>
  );
};
