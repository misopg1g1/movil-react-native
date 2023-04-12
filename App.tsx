import React from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MainStack from './src/navigators/main.stack';

const App = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const WhiteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  const BlackTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };

  return (
    <NavigationContainer theme={isDarkMode ? BlackTheme : WhiteTheme}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
