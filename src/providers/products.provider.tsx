import {API_URL} from '@env';
export interface LoginParams {
  user: string;
  password: string;
}

export class ProductsProvider {
  public static getAllProducts = (token: string) => {
    return fetch(`${API_URL}products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
