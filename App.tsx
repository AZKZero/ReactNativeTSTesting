/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './Home';
import {createState} from '@hookstate/core';
import {EE1DCounterScreen} from './TextHookTest';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RequestConfig, ServiceBuilder, Response} from 'ts-retrofit';
import {OperatorList} from './operator-module/OperatorList';
import {OperatorService} from './api/retrofit';

export const Section: React.FC<{
  children: any;
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

type StackParamMap = {
  Home: undefined;
  HookTest: undefined;
  Maximilan: undefined;
};

const Stack = createNativeStackNavigator<StackParamMap>();

export type Props = NativeStackScreenProps<StackParamMap, 'Home'>;

export const EE1D = createState({uses: 3, cooldown: 0});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home?'}} />
        <Stack.Screen
          name="HookTest"
          options={{title: 'EY?'}}
          component={EE1DCounterScreen}
        />
        <Stack.Screen
          name="Maximilan"
          options={{title: 'Lelx?'}}
          component={OperatorList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

const myLogCallback = (config: RequestConfig, response: Response) => {
  const log = `[${config.method}] ${config.url} ${response.status}`;
  console.log(log); // [GET] http://localhost:12345/ping 200
};
export const service = new ServiceBuilder()
  .setEndpoint('http://10.0.2.2:3000')
  .setLogCallback(myLogCallback)
  .build(OperatorService);
