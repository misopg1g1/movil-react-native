// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Alert, BackHandler, Button, Settings, Text, View} from 'react-native';
import React from 'react';
import {
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import {
  AuthContext,
  AuthProvider,
  IAuthContext,
  Roles,
  useAuthContext,
} from '../auth.context';
import {LoginProvider} from '../../providers/users.provider';
import {Language} from '../../utils/language.utils';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {authContent} from '../auth.content';

jest.mock('react-native-localize');
jest.mock('../../utils/language.utils');
jest.mock('../../providers/users.provider');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

const TestComponent: React.FC = () => {
  const {doLoginIn, token} = useAuthContext();

  return (
    <>
      <Button
        title="Login"
        onPress={async () => {
          await doLoginIn({user: 'test', password: 'test'});
        }}
        testID="login-button"
      />
      <Text testID="token-value">{token || 'undefined'}</Text>
    </>
  );
};

const WrappedTestComponent: React.FC = () => {
  return (
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

jest.mock('react-native', () => {
  const originalModule = jest.requireActual('react-native');
  return {
    ...originalModule,
    BackHandler: {
      ...originalModule.BackHandler,
      addEventListener: jest.fn((eventName, handler) => {
        if (eventName === 'hardwareBackPress') {
          setTimeout(() => handler(), 0); // Simulate back button press
        }
      }),
      removeEventListener: jest.fn(),
    },
  };
});

describe('useAuthContext', () => {
  beforeEach(() => {
    // Limpia las instancias de burla entre las pruebas
    jest.clearAllMocks();
  });

  test('should throw error when used outside of EventProvider', () => {
    const testFn = () => renderHook(() => useAuthContext());
    expect(testFn).toThrowError(
      Error('useAuthContext must be used within an EventProvider'),
    );
  });

  test('should not throw error when used inside of EventProvider', () => {
    const mockContextValue: IAuthContext = {
      token: '',
      doLoginIn: async () => {},
      doLogout: async () => {},
      user: {
        created_at: '',
        enabled: true,
        id: 1,
        role: 'ADMIN' as Roles,
        updated_at: '',
        user: '',
        verified: true,
      },
      userClients: [],
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthContext(), {wrapper});
    expect(result.current).toEqual(mockContextValue);
  });

  test('should log in and set token on successful login', async () => {
    const loginResponse = {access_token: 'test_token'};
    (LoginProvider.login as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(loginResponse),
    });

    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="YourComponent" component={WrappedTestComponent} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(LoginProvider.login).toHaveBeenCalledTimes(1);
    });
  });

  test('should set token to undefined when response is other than 200', async () => {
    (LoginProvider.login as jest.Mock).mockResolvedValue({
      status: 401,
    });
    (Language.translate as jest.Mock).mockReturnValue('Login failed');
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="YourComponent" component={WrappedTestComponent} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      const token = getByTestId('token-value').props.children;
      expect(LoginProvider.login).toHaveBeenCalledTimes(1);
      expect(token).toEqual('undefined');
    });
  });

  test('should show an alert when the use is not a seller', async () => {
    (LoginProvider.login as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => ({
        data: {
          role: 'ADMIN',
        },
      }),
    });
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="YourComponent" component={WrappedTestComponent} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      const token = getByTestId('token-value').props.children;
      expect(LoginProvider.login).toHaveBeenCalledTimes(1);
      expect(Alert.alert).toBeCalledTimes(1);
      expect(token).toEqual('undefined');
    });
  });
});
