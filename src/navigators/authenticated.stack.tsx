import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductsScreen from '../pages/products/products.screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_CODES} from '../utils/colors';
import {useAuthContext} from '../context/auth.context';
import {CustomDrawer} from './custom-drawer.component';
import OrdersScreen from '../pages/orders/orders.screen';
import VisitsScreen from '../pages/visits/visits.screen';
import {Language} from '../utils/language.utils';
import {authStackContent} from './authenticated.content';

const Drawer = createDrawerNavigator();

export const MainIcon = () => {
  const navigationHook = useNavigation();
  return (
    <TouchableOpacity
      testID="header-drawer-button"
      style={styles.drawerIconContainer}
      onPress={() => {
        navigationHook.dispatch(DrawerActions.toggleDrawer());
      }}>
      <Icon name="bars" size={15} color="white" testID="drawer-icon" />
    </TouchableOpacity>
  );
};

export const ProfileHeader = () => {
  const navigationHook = useNavigation();
  const {user} = useAuthContext();
  return (
    <TouchableOpacity
      style={styles.profileContainer}
      onPress={() => {
        navigationHook.dispatch(DrawerActions.toggleDrawer());
      }}
      testID="profile-header">
      <Text style={styles.nameText}>{user?.user}</Text>
      <View style={styles.profileIconContainer}>
        <Icon name="user" size={25} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default function AuthenticatedNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: COLOR_CODES.BLUE},
        headerLeft: () => MainIcon(),
        headerRight: () => ProfileHeader(),
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: Language.translate(authStackContent.products),
          drawerLabel: Language.translate(authStackContent.products),
          headerTitleStyle: {
            fontWeight: '300',
            color: COLOR_CODES.WHITE,
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: Language.translate(authStackContent.orders),
          drawerLabel: Language.translate(authStackContent.orders),
          headerTitleStyle: {
            fontWeight: '300',
            color: COLOR_CODES.WHITE,
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="Visits"
        component={VisitsScreen}
        options={{
          title: Language.translate(authStackContent.visits),
          drawerLabel: Language.translate(authStackContent.visits),
          headerTitleStyle: {
            fontWeight: '300',
            color: COLOR_CODES.WHITE,
            fontSize: 20,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIconContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: COLOR_CODES.WHITE,
    borderRadius: 50,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  profileIconContainer: {
    borderWidth: 2,
    borderColor: COLOR_CODES.WHITE,
    borderRadius: 50,
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  nameText: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24.2,
    color: COLOR_CODES.WHITE,
  },
});
