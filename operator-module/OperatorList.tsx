import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {useHookEffect, useState} from '@hookstate/core';
import {service, StackParamMap} from '../App';
import {Operator} from '../api/retrofit';
import {FlatGrid} from 'react-native-super-grid';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    maxWidth: 100,
    height: 100,
  },
});
export const OperatorList = ({
  navigation,
}: NativeStackScreenProps<StackParamMap, 'Maximilan'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const opListState = useState<Operator[]>([]);

  useHookEffect(() => {
    service.listOperators(true).then(value => opListState.set(value.data.data));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatGrid
        itemDimension={130}
        data={opListState.get()}
        renderItem={info => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('OpDetails', {id: info.item.id})
            }>
            <View>
              <Image style={styles.image} source={{uri: info.item.png}} />
              <Text style={styles.item}>{info.item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
      {/*<FlatList
        data={opListState.get()}
        renderItem={info => (
          <View>
            <Image style={styles.image} source={{uri: info.item.png}} />
            <Text style={styles.item}>{info.item.name}</Text>
          </View>
        )}
      />*/}
    </SafeAreaView>
  );
};
