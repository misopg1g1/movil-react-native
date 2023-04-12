import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const defaultNavigationOptions: NativeStackNavigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    color: 'black',
    fontWeight: '600',
  },
  gestureEnabled: true,
  headerBackTitleVisible: false,
};
