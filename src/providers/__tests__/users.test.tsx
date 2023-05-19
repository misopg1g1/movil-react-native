import {hashObject} from '../../utils/hash.utils';
import {LoginProvider} from '../users.provider';

global.fetch = jest.fn();

const token = 'test-token';
const API_ENDPOINT_C = `https://stagingapi.edgarluna.dev/customers`;
const API_ENDPOINT_L = `https://stagingapi.edgarluna.dev/session/login`;

describe('UsersProvider', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('calls getClients with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await LoginProvider.getClients('1', token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT_C, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('calls login with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await LoginProvider.login({user: 'user', password: 'password'});

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT_L, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...{user: 'user', password: 'password'},
        ...hashObject({user: 'user', password: 'password'}),
      }),
    });
  });
});
