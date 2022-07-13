import { SafeAreaView, StatusBar, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, useColorScheme } from "react-native";
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <DropDownPicker
        listMode={'MODAL'}
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
      {/*<TouchableWithoutFeedback*/}
      <FlexWrapper direction="row">
        <Button title="Desmond Miles" />
        {value.get().includes('1') ? <Button title="Altair Ibn La-Ahad" /> : <></>}
        {value.get().includes('ezio') ? <Button title="Ezio Auditore Da Firenze" /> : <></>}
        {value.get().includes('3') ? <Button title="Connor Kenway" /> : <></>}
        {value.get().includes('3') ? <Button title="Aveline de Grandpre" /> : <></>}
        {value.get().includes('4') ? <Button title="Edward Kenway" /> : <></>}
        {value.get().includes('4') ? <Button title="Adewale" /> : <></>}
        {value.get().includes('5') ? <Button title="Arno Victor Dorian" /> : <></>}
        {value.get().includes('6') ? <Button title="Jacob Frye" /> : <></>}
        {value.get().includes('6') ? <Button title="Evie Frye" /> : <></>}
        {value.get().includes('7') ? <Button title="Bayek of Siwa" /> : <></>}
        <Button title="William Miles" />
      </FlexWrapper>
    </SafeAreaView>
  );
};
