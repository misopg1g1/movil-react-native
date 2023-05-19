import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MainStack from './src/navigators/main.stack';
import {AuthProvider} from './src/context/auth.context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProductProvider} from './src/context/product.context';
import {VisitProvider} from './src/context/visit.context';
import {hashObject} from './src/utils/hash.utils';
import {OrderProvider} from './src/context/order.context';

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
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? BlackTheme : WhiteTheme}>
        <AuthProvider>
          <ProductProvider>
            <VisitProvider>
              <OrderProvider>
                <MainStack />
              </OrderProvider>
            </VisitProvider>
          </ProductProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
