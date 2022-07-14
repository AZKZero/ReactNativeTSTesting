import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {useHookEffect, useState} from '@hookstate/core';
import {service, StackParamMap} from '../App';
import {Operator} from '../api/retrofit';
import {FlatGrid} from 'react-native-super-grid';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonGroup} from '@rneui/themed';
import {Image} from 'react-native-expo-image-cache';
export const OperatorList = ({navigation}: NativeStackScreenProps<StackParamMap, 'OpList'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
      maxWidth: 70,
      height: 70,
    },
    lowText: {
      padding: 10,
      fontSize: 18,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
    },
  });

  const opListState = useState<Operator[]>([]);

  useHookEffect(() => {
    service.listAllOperators().then(value => opListState.set(value.data.data));
  }, []);

  let lastIndex: boolean | null = null;

  // const attackerSelected = useState(false);
  // const defenderSelected = useState(false);
  // const attackerSelected = false;
  // const defenderSelected = false;

  const selectedIndex = useState<number | null>(null);

  useHookEffect(() => {
    const index = selectedIndex.value;
    if (index === 0) {
      service.listOperators(true).then(value => opListState.set(value.data.data));
    } else if (index === 1) {
      service.listOperators(false).then(value => opListState.set(value.data.data));
    } else {
      service.listAllOperators().then(value => opListState.set(value.data.data));
    }
  }, [selectedIndex.value]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/*<Button
        title={'Go to DB'}
        onPress={() => navigation.navigate('DBModule')}
      />*/}
      <Button title={'Infinity Tangent'} onPress={() => navigation.navigate('InfinityTangent')} />
      <ButtonGroup
        selectedIndex={selectedIndex.get()}
        buttons={['Attackers', 'Defenders']}
        onPress={index => {
          if (index === lastIndex) {
            selectedIndex.set(() => null);
          } else {
            lastIndex = index;
            selectedIndex.set(() => index);
          }
        }}
      />

      <FlatGrid
        itemDimension={130}
        data={opListState.get()}
        style={{marginBottom: 50}}
        renderItem={info => (
          <TouchableHighlight onPress={() => navigation.navigate('OpDetails', {id: info.item.id})}>
            <View>
              <Image style={styles.image} {...{uri: info.item.png}} />
              <Text style={styles.lowText}>{info.item.name}</Text>
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
