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
    console.log(objectWithHash);
    return fetch(`${API_URL}session/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectWithHash),
    });
  };
}
