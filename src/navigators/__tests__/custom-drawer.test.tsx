import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CustomDrawer} from '../custom-drawer.component';
import {useAuthContext} from '../../context/auth.context';
import {DrawerStatus, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

jest.mock('../../context/auth.context', () => ({
  useAuthContext: jest.fn().mockReturnValue({
    user: {user: 'Test User'},
    doLogout: jest.fn(),
  }),
}));

function MockScreen() {
  return null;
}

const Drawer = createDrawerNavigator();

const mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  getCurrentRoute: jest.fn(),
  getCurrentOptions: jest.fn(),
  getId: jest.fn(),
  emit: jest.fn(),
  jumpTo: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
};

const mockDrawerProps = {
  state: {
    index: 0,
    key: 'drawer',
    routeNames: ['Products', 'Orders', 'Visits'],
    routes: [
      {key: 'Products', name: 'Products'},
      {key: 'Orders', name: 'Orders'},
      {key: 'Visits', name: 'Visits'},
    ],
    type: 'drawer' as 'drawer',
    default: 'closed' as DrawerStatus,
    history: [],
    stale: false as false,
  },
  navigation: mockNavigation,
  descriptors: {
    Products: {
      render: jest.fn(),
      options: {drawerLabel: 'Products'},
      navigation: mockNavigation,
      route: {key: 'Products', name: 'Products'},
    },
    Orders: {
      render: jest.fn(),
      options: {drawerLabel: 'Orders'},
      navigation: mockNavigation,
      route: {key: 'Orders', name: 'Orders'},
    },
    Visits: {
      render: jest.fn(),
      options: {drawerLabel: 'Visits'},
      navigation: mockNavigation,
      route: {key: 'Visits', name: 'Visits'},
    },
  },
};

describe('CustomDrawer', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={() => <CustomDrawer {...mockDrawerProps} />}>
          <Drawer.Screen name="Mock" component={MockScreen} />
        </Drawer.Navigator>
      </NavigationContainer>,
    );

    // Check if user's name is displayed
    expect(getByText('Test User')).toBeTruthy();

    // Check if drawer items are displayed
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Orders')).toBeTruthy();
    expect(getByText('Visits')).toBeTruthy();

    // Check if footer items are displayed
    expect(getByTestId('settings-text')).toBeTruthy();
    expect(getByTestId('logout-text')).toBeTruthy();
  });

  it('calls doLogout when Logout is pressed', () => {
    const doLogoutMock = jest.fn();
    (useAuthContext as jest.Mock).mockReturnValue({
      user: {user: 'Test User'},
      doLogout: doLogoutMock,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={() => <CustomDrawer {...mockDrawerProps} />}>
          <Drawer.Screen name="Mock" component={MockScreen} />
        </Drawer.Navigator>
      </NavigationContainer>,
    );

    // Press the Logout button
    fireEvent.press(getByTestId('logout-button'));

    // Check if doLogout has been called
    expect(doLogoutMock).toHaveBeenCalled();
  });

  // ... other test cases
});
