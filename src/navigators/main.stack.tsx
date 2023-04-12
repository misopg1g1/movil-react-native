import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StartStackRouteNames} from '../routes/startRoutes';
import {defaultNavigationOptions} from './defaultNavigationOptions';
import ProductsScreen from '../pages/products/products.screen';
import LoginScreen from '../pages/login/login.screen';

export const Stack = createNativeStackNavigator();

export default function MainStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName={StartStackRouteNames.LoginScreen}
      screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name={StartStackRouteNames.LoginScreen}
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2F76E5',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={StartStackRouteNames.ProductsScreen}
        component={ProductsScreen}
        options={{
          headerTitle: 'Products',
          headerLargeTitle: true,
          headerTintColor: 'white',
          headerTitleStyle: {color: 'white'},
          headerStyle: {
            backgroundColor: '#2F76E5',
          },
        }}
      />
    </Stack.Navigator>
  );
}
