import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StartStackRouteNames} from '../routes/startRoutes';
import {defaultNavigationOptions} from './defaultNavigationOptions';
import LoginScreen from '../pages/login/login.screen';
import AuthenticatedNavigator from './authenticated.stack';
import CreateVisitScreen from '../pages/create-visit/create-visit.screen';

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
        component={AuthenticatedNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="CreateVisit"
          component={CreateVisitScreen}
          options={{
            headerTitle: '',
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
