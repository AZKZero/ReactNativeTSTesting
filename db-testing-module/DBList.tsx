import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {dataSource, StackParamMap} from '../App';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  Button,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {useState} from '@hookstate/core';
import {Blog} from '../db/blog';

export const DBList = ({
  navigation,
}: NativeStackScreenProps<StackParamMap, 'DBModule'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const altState = useState<Blog[]>(() =>
    dataSource.getRepository(Blog).find({
      relations: {
        author: true,
      },
    }),
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {altState.promised ? (
        <></>
      ) : (
        <FlatList
          data={altState.get()}
          renderItem={info => (
            <View>
              <Text>{info.item.title}</Text>
              <br />
              <Text>{info.item.body}</Text>
              <br />
              <Text>{info.item.author.name}</Text>
            </View>
          )}
        />
      )}
      <Button
        title={'Create New'}
        onPress={() => {
          navigation.navigate('CreateBlog');
        }}
      />
    </SafeAreaView>
  );
};
