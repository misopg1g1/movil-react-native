import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import LoginScreen from '../login.screen';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  AuthContext,
  AuthProvider,
  IAuthContext,
  Roles,
} from '../../../context/auth.context';

const Stack = createNativeStackNavigator();

describe('LoginScreen', () => {
  it('displays the login form correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="YourComponent"
              component={(
                props: JSX.IntrinsicAttributes & {
                  navigation: NativeStackNavigationProp<ParamListBase>;
                },
              ) => <LoginScreen {...props} />}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>,
    );

    expect(getByText('CCP')).toBeTruthy();
    expect(getByText('CCP V1.0 System')).toBeTruthy();
    expect(getByText('Iniciar Sesión')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu usuario')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(getByText('Ingresar')).toBeTruthy();
  });

  it('calls doLoginIn function with the correct arguments when login button is pressed', () => {
    const mockDoLogIn = jest.fn();
    const mockContextValue: IAuthContext = {
      token: '',
      doLoginIn: mockDoLogIn,
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

    const AuthContextMocked = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <AuthContextMocked>
          <Stack.Navigator>
            <Stack.Screen
              name="YourComponent"
              component={(
                props: JSX.IntrinsicAttributes & {
                  navigation: NativeStackNavigationProp<ParamListBase>;
                },
              ) => <LoginScreen {...props} />}
            />
          </Stack.Navigator>
        </AuthContextMocked>
      </NavigationContainer>,
    );

    const usernameInput = getByPlaceholderText('Ingresa tu usuario');
    const passwordInput = getByPlaceholderText('Ingresa tu contraseña');
    const loginButton = getByText('Ingresar');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    expect(mockDoLogIn).toHaveBeenCalledWith({
      user: 'testuser',
      password: 'testpassword',
    });
  });
});
