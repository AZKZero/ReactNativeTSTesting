/* eslint-disable */
import {
  FlatList,
  Image, ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme, useWindowDimensions,
  View,
} from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useState} from '@hookstate/core';
import { Operator, StatsOperator } from "../api/retrofit";
import {OpProp, service} from '../App';
import React from 'react';
import * as Progress from 'react-native-progress';
import RenderHtml from 'react-native-render-html';

export const OperatorDetails = ({route, navigation}: OpProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    safeArea: {

    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:"space-between"
    },
    highText: {
     color: 'white',
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
      color: 'white',
    },
    x: {
      padding: 10,
      fontSize: 18,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: 'white',
    },
    image: {
      flex: 2,
      maxWidth: 200,
      height: 200,
    },
  });

  const opStatState = useState<StatsOperator>(() => service.getOperatorStats('pc', 'Ghostware-Zero', route.params.id).then((value) => value.data))

  const opDetailsState = useState<Operator>(() =>
    service.getOperator(route.params.id).then(value => {
      navigation.setOptions({title: value.data.name});
      return value.data;
    }),
  );

  // useHookEffect(, []);

  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground source={require('./../assets/r6back.jpg')} style={{width: '100%', height: '100%'}}>
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
            {/*<View>*/}
            {/*  <Text style={styles.lowText}>{opDetailsState.promised? 'Health':''}</Text>*/}
            {/*  <Rater total={3} rating={opDetailsState.value.ratings.health} interactive={false}/>*/}
            {/*</View>*/}
            {/*<View>*/}
            {/*  <Text style={styles.lowText}>{opDetailsState.promised? 'Speed':''}</Text>*/}
            {/*  <Rater total={3} rating={opDetailsState.value.ratings.speed} interactive={false}/>*/}
            {/*</View>*/}
            {/*<View>*/}
            {/*  <Text style={styles.lowText}>{opDetailsState.promised? 'Difficulty':''}Difficulty</Text>*/}
            {/*  <Rater total={3} rating={opDetailsState.value.ratings.difficulty} interactive={false}/>*/}
            {/*</View>*/}
          </View>
          <Text style={styles.lowText}>{`Gender: ${opDetailsState.get().meta.gender==='f'? 'Female':'Male'}`}</Text>
          <Text style={styles.lowText}>{`Country: ${opDetailsState.get().meta.country}`}</Text>
          <Text style={styles.lowText}>{`Season: ${opDetailsState.get().meta.season}`}</Text>
          <RenderHtml contentWidth={width} tagsStyles={{
            p: {
              padding: 10,
              fontSize: 18,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }
          }} source={{html: `<p><b>Price: </b>  <span style="color: yellow">${opDetailsState.get().meta.price.renown} Renown</span>  <span style="color: cadetblue">${opDetailsState.get().meta.price.r6credits} R6</span></p>`}}/>
          {opStatState.promised?
            <Progress.Pie indeterminate={true} size={50} />
            : <View>
                <View style={styles.flex}>
                  <Image
                    style={styles.image}
                    source={{uri: (opStatState.get() as StatsOperator).header}}
                  />
                  <View style={{flex: 3}}>
                    <Text style={styles.highText}>{(opStatState.get() as StatsOperator).name}</Text>
                    <Text style={styles.highText}>
                      {(opStatState.get() as StatsOperator).operator_stat}
                    </Text>
                    <Text style={styles.highText}>
                      {(opStatState.get() as StatsOperator).time_played}
                    </Text>
                  </View>
                </View>
                <Text style={styles.lowText}>{`K/D: ${(opStatState.get() as StatsOperator).kd}`}</Text>
                <Text style={styles.lowText}>{`Kills: ${(opStatState.get() as StatsOperator).kills}`}</Text>
                <Text style={styles.lowText}>{`Melee Kills: ${(opStatState.get() as StatsOperator).melee_kills}`}</Text>
                <Text style={styles.lowText}>{`Deaths: ${(opStatState.get() as StatsOperator).deaths}`}</Text>
                <Text style={styles.lowText}>{`Win %: ${(opStatState.get() as StatsOperator).win_}`}</Text>
                <Text style={styles.lowText}>{`Loses: ${(opStatState.get() as StatsOperator).losses}`}</Text>
                <Text style={styles.lowText}>{`Headshots: ${(opStatState.get() as StatsOperator).headshots_}`}</Text>
              </View>
          }
        </ScrollView>
      )}
      </ImageBackground>
    </SafeAreaView>
  );
};
