import {StyleSheet, View} from 'react-native';
import React from 'react';

export const FlexWrapper: React.FC<{
  children: any;
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}> = ({children, direction}) => {
  const style = StyleSheet.create({
    flexer: {
      display: 'flex',
      flexDirection: direction,
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  });
  return <View style={style.flexer}>{children}</View>;
};
