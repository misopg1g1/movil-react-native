import React, {useState} from 'react';
import {LoginParams, LoginProvider} from '../providers/users.provider';
import {Alert} from 'react-native';
import {Language} from '../utils/language.utils';
import {authContent} from './auth.content';

export interface IAuthContext {
  doLoginIn: (params: LoginParams) => Promise<void>;
  token: string | undefined;
}

interface LoginResponseDto {
  access_token: string;
  data: UserDto;
}

enum Roles {
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

  const doLoginIn = async (params: LoginParams) => {
    const response = await LoginProvider.login(params);
    if (response.status === 200) {
      const result: LoginResponseDto = await response.json();
      setToken(result.access_token);
    } else {
      setToken(undefined);
      Alert.alert(Language.translate(authContent.alert));
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        doLoginIn,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
