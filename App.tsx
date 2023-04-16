import React from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MainStack from './src/navigators/main.stack';
import {AuthProvider} from './src/context/auth.context';

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
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
