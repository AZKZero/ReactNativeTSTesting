import {Pressable, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {FlexWrapper} from '../utils/FlexWrapper';
import {Button} from '@rneui/themed';
import {useState} from '@hookstate/core';
import DropDownPicker from 'react-native-dropdown-picker';

export const InfinityTangent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const style = StyleSheet.create({
    bStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      width: '100%',
    },
    button: {
      margin: 10,
    },
  });
  const open = useState(false);
  const value = useState<string[]>([]);
  const items = useState([
    {label: 'Ezio Trilogy', value: 'ezio'},
    {label: 'I', value: '1'},
    {label: 'III', value: '3'},
    {label: 'Black Flag', value: '4'},
    {label: 'Unity', value: '5'},
    {label: 'Syndicate', value: '6'},
    {label: 'Origins', value: '7'},
  ]);
  return (
    <Pressable
      onPress={() => {
        console.log('closing');
        open.set(false);
      }}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{height: '100%'}}>
          <DropDownPicker
            listMode={'FLATLIST'}
            flatListProps={{initialNumToRender: 10}}
            multiple={true}
            badgeDotColors={['red', 'blue', 'orange', 'cyan']}
            mode="BADGE"
            maxHeight={500}
            open={open.get()}
            value={value.get()}
            items={items.get()}
            setOpen={open.set}
            setValue={value.set}
            setItems={items.set}
          />
          <FlexWrapper direction="row">
            <Button buttonStyle={style.button} title="Desmond Miles" />
            {value.get().includes('1') ? <Button buttonStyle={style.button} title="Altair Ibn La-Ahad" /> : <></>}
            {value.get().includes('ezio') ? <Button buttonStyle={style.button} title="Ezio Auditore Da Firenze" /> : <></>}
            {value.get().includes('3') ? <Button buttonStyle={style.button} title="Connor Kenway" /> : <></>}
            {value.get().includes('3') ? <Button buttonStyle={style.button} title="Aveline de Grandpre" /> : <></>}
            {value.get().includes('4') ? <Button buttonStyle={style.button} title="Edward Kenway" /> : <></>}
            {value.get().includes('4') ? <Button buttonStyle={style.button} title="Adewale" /> : <></>}
            {value.get().includes('5') ? <Button buttonStyle={style.button} title="Arno Victor Dorian" /> : <></>}
            {value.get().includes('6') ? <Button buttonStyle={style.button} title="Jacob Frye" /> : <></>}
            {value.get().includes('6') ? <Button buttonStyle={style.button} title="Evie Frye" /> : <></>}
            {value.get().includes('7') ? <Button buttonStyle={style.button} title="Bayek of Siwa" /> : <></>}
            <Button buttonStyle={style.button} title="William Miles" />
          </FlexWrapper>
        </View>

        {/*<TouchableWithoutFeedback*/}
      </SafeAreaView>
    </Pressable>
  );
};
