import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR_CODES} from '../utils/colors';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onPress: () => void;
}

export const FloatingActionButton = ({onPress}: Props): JSX.Element => {
  const styles = getStyles(COLOR_CODES.DARK_BLUE);
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Icon5 name="plus" size={36} color={COLOR_CODES.WHITE} />
    </TouchableOpacity>
  );
};

const getStyles = (buttonColor: string) => {
  return StyleSheet.create({
    root: {
      zIndex: 500,
      position: 'absolute',
      right: 31,
      bottom: 31,
      height: 54,
      width: 54,
      backgroundColor: buttonColor,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      // shadow
      shadowColor: COLOR_CODES.BLUE,
      shadowRadius: 2,
      shadowOpacity: 0.25,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    icon: {
      fontSize: 30,
      color: COLOR_CODES.WHITE,
    },
  });
};
