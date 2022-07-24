import {Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {FlexWrapper} from '../utils/FlexWrapper';
import {Button} from '@rneui/themed';
import {useState} from '@hookstate/core';
import DropDownPicker from 'react-native-dropdown-picker';
import {DocumentDirectoryPath} from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
import RNFetchBlob from 'rn-fetch-blob';
const RNFS = require('react-native-fs');

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
          <Button
            title={'Download Dokkaebi Wallpaper'}
            onPress={async () => {
              try {
                await RNFS.mkdir(`${DocumentDirectoryPath}/TangentMaximus`);
                let downloadResult = await RNFS.downloadFile({
                  fromUrl: 'https://wallpapercave.com/download/dokkaebi-wallpapers-wp6813850',
                  toFile: `${DocumentDirectoryPath}/TangentMaximus/dokka.png`,
                }).promise;
                console.log(downloadResult.statusCode);
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <Button
            title={'Download Siege Wallpaper'}
            onPress={async () => {
              try {
                await RNFS.mkdir(`${DocumentDirectoryPath}/TangentMaximus`);
                let downloadResult = await RNFS.downloadFile({
                  fromUrl: 'https://wallpapercave.com/download/rainbow-six-siege-wallpapers-wp1846953',
                  toFile: `${DocumentDirectoryPath}/TangentMaximus/siege.jpg`,
                }).promise;
                console.log(downloadResult.statusCode);
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <Button
            title={'Download Black Ice Wallpaper'}
            onPress={async () => {
              RNFetchBlob.config({
                addAndroidDownloads: {
                  useDownloadManager: true, // <-- this is the only thing required
                  mediaScannable: true,
                  // Optional, override notification setting (default to true)
                  notification: true,
                  // Optional, but recommended since android DownloadManager will fail when
                  // the url does not contains a file extension, by default the mime type will be text/plain
                  mime: 'image/jpg',
                  description: 'File downloaded by download manager.',
                },
              })
                .fetch('GET', 'https://wallpaperaccess.com/download/black-ice-r6-3085268')
                .then(resp => {
                  // the path of downloaded file
                  console.log(resp.path());
                });
              /* try {
                // await RNFS.mkdir(`${Platform.OS === 'android' ? DownloadDirectoryPath : DocumentDirectoryPath}/TangentMaximus`);
                let dir = /!*Platform.OS === 'android' ? *!/ await ScopedStorage.openDocumentTree(true);
                let downloadResult = await RNFS.downloadFile({
                  fromUrl: 'https://wallpaperaccess.com/download/black-ice-r6-3085268',
                  toFile: `${DocumentDirectoryPath}/blackice.jpg`,
                }).promise;
                console.log(downloadResult.statusCode);
                console.log(`${DocumentDirectoryPath}/blackice.jpg`);
                console.log(await ScopedStorage.stat(`file:/${DocumentDirectoryPath}/blackice.jpg`));
                console.log(dir);
                console.log(`${`${dir.uri}/blackice.jpg`} ${`${dir.path}/blackice.jpg`}`);
                await ScopedStorage.copyFile(`file:/${DocumentDirectoryPath}/blackice.jpg`, `${dir.uri}%2Fblackice.jpg`, async () => {
                  console.log(await ScopedStorage.stat(`${dir.uri}%2Fblackice.jpg`));
                });
              } catch (e) {
                console.error(e);
              }*/
            }}
          />
        </View>
        {/*<TouchableWithoutFeedback*/}
      </SafeAreaView>
    </Pressable>
  );
};
