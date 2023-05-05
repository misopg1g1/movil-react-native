import React, {useState} from 'react';
import {LoginParams, LoginProvider} from '../providers/users.provider';
import {Alert} from 'react-native';
import {Language} from '../utils/language.utils';
import {authContent} from './auth.content';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StartStackParamList} from '../routes/startRoutes';
import {StartStackRouteNames} from '../routes/startRoutes';

export interface IAuthContext {
  doLoginIn: (params: LoginParams) => Promise<void>;
  token: string | undefined;
  user: UserDto | undefined;
  doLogout: () => void;
}

interface LoginResponseDto {
  access_token: string;
  data: UserDto;
}

export enum Roles {
  ADMIN = 'ADMIN',
}

interface UserDto {
  created_at: string;
  enabled: boolean;
  id: number;
  role: Roles;
  updated_at: string;
  user: string;
  verified: boolean;
}

export const AuthContext: React.Context<IAuthContext | undefined> =
  React.createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an EventProvider');
  }
  return context;
};

export const AuthProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const navigation = useNavigation<NavigationProp<StartStackParamList>>();

  const doLoginIn = async (params: LoginParams) => {
    try {
      const response = await LoginProvider.login(params);
      if (response.status === 200) {
        const result: LoginResponseDto = await response.json();
        setToken(result.access_token);
        setUser(result.data);
      } else {
        setToken(undefined);
        setUser(undefined);
        Alert.alert(Language.translate(authContent.alert));
      }
    } catch (e) {
      Alert.alert(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    }
  };

  const doLogout = () => {
    setToken(undefined);
    setUser(undefined);
    navigation.navigate(StartStackRouteNames.LoginScreen);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        doLoginIn,
        user,
        doLogout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
