import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ProfileHeader, MainIcon} from '../authenticated.stack';
import {AuthContext, Roles, UserDto} from '../../context/auth.context';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MockScreen() {
  return null;
}

jest.mock('../../context/auth.context', () => {
  const originalModule = jest.requireActual('../../context/auth.context');
  return {
    ...originalModule,
    useAuthContext: () => ({user: {user: 'Test User'}}),
  };
});

jest.mock('../../utils/language.utils', () => ({
  translate: (key: string) => key,
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      dispatch: jest.fn(),
    }),
  };
});

describe('ProfileHeader', () => {
  it('displays the user name', () => {
    const mockUser: UserDto = {
      user: 'Test User',
      created_at: '',
      enabled: true,
      id: 1,
      role: Roles.ADMIN,
      verified: true,
      updated_at: '',
    };

    const {getByText} = render(
      <AuthContext.Provider
        value={{
          user: mockUser,
          doLoginIn: jest.fn(),
          token: 'test',
          doLogout: jest.fn(),
          userClients: [],
        }}>
        <NavigationContainer>
          <ProfileHeader />
        </NavigationContainer>
      </AuthContext.Provider>,
    );

    expect(getByText('Test User')).toBeTruthy();
  });
  it('displays the main icon', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Mock" component={MockScreen} />
        </Drawer.Navigator>
        <MainIcon />
      </NavigationContainer>,
    );

    expect(getByTestId('drawer-icon')).toBeTruthy();
  });

  it('opens the drawer on press', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Mock" component={MockScreen} />
        </Drawer.Navigator>
        <MainIcon />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('drawer-icon'));
  });
});
