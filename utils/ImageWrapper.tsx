import React from 'react';
import {ImageSourcePropType, ImageURISource, View} from 'react-native';
import {useHookEffect, useState} from '@hookstate/core';
import {Image} from '@rneui/themed';

export const ImageWrapper: React.FC<{
  source: ImageSourcePropType;
  width: number;
}> = ({source, width}) => {
  const heightWidthState = useState({width: 0, height: 0});
  useHookEffect(() => {
    Image.getSize(
      (source as ImageURISource).uri as string,
      (widthX, height) => {
        heightWidthState.height.set(height);
      },
    );
  }, []);
  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={source}
        style={{
          height: heightWidthState.get().height,
          width: width,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};
