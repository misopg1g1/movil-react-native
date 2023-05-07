import {API_URL} from '@env';
import {hashObject} from '../utils/hash.utils';
export interface LoginParams {
  user: string;
  password: string;
}

export class LoginProvider {
  public static login = (params: LoginParams) => {
    const objectWithHash = hashObject({
      user: params.user,
      password: params.password,
    });
    return fetch(`${API_URL}session/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectWithHash),
    });
  };

  public static getClients = (id: string, token: string) => {
    return fetch(`${API_URL}customers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
