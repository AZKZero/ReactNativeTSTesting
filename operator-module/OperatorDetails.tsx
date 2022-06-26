/* eslint-disable */
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useState} from '@hookstate/core';
import {Operator} from '../api/retrofit';
import {OpProp, service} from '../App';
import React from 'react';
import * as Progress from 'react-native-progress';
import Rater from "react-rater";

export const OperatorDetails = ({route, navigation}: OpProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    flex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:"space-between"
    },
    highText: {
      padding: 10,
      fontSize: 25,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    lowText: {
      padding: 10,
      fontSize: 18,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    image: {
      flex: 2,
      maxWidth: 200,
      height: 200,
    },
  });

  const opDetailsState = useState<Operator>(() =>
    service.getOperator(route.params.id).then(value => {
      navigation.setOptions({title: value.data.name});
      return value.data;
    }),
  );

  // useHookEffect(, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {opDetailsState.promised ? (
        <Progress.Pie indeterminate={true} size={50} />
      ) : (
        <ScrollView>
          <View style={styles.flex}>
            <Image
              style={styles.image}
              source={{uri: opDetailsState.get().png}}
            />
            <View style={{flex: 3}}>
              <Text style={styles.highText}>{opDetailsState.get().name}</Text>
              <Text style={styles.highText}>
                {opDetailsState.get().bio.real_name}
              </Text>
            </View>
          </View>
          <Text style={styles.highText}>{opDetailsState.get().role}</Text>
          <View style={styles.flex}>
            <Text style={styles.lowText}>{`Health: ${opDetailsState.get().ratings.health}`}</Text>
            <Text style={styles.lowText}>{`Speed: ${opDetailsState.get().ratings.speed}`}</Text>
            <Text style={styles.lowText}>{`Difficulty: ${opDetailsState.get().ratings.difficulty}`}</Text>
            {/*<View>
              <Text style={styles.lowText}>{opDetailsState.promised? 'Health':''}</Text>
              <Rater total={3} rating={opDetailsState.value.ratings.health} interactive={false}/>
            </View>
            <View>
              <Text style={styles.lowText}>{opDetailsState.promised? 'Speed':''}</Text>
              <Rater total={3} rating={opDetailsState.value.ratings.speed} interactive={false}/>
            </View>
            <View>
              <Text style={styles.lowText}>{opDetailsState.promised? 'Difficulty':''}Difficulty</Text>
              <Rater total={3} rating={opDetailsState.value.ratings.difficulty} interactive={false}/>
            </View>*/}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
