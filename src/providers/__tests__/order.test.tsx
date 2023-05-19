import {hashObject} from '../../utils/hash.utils';
import {OrdersProvider} from '../order.provider';

global.fetch = jest.fn();

const token = 'test-token';
const API_ENDPOINT = `https://stagingapi.edgarluna.dev/orders`;

describe('OrdersProvider', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('calls getOrdersFromSeller with the correct URL and headers', async () => {
    const response = {data: 'data'};
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await OrdersProvider.getOrdersFromSeller(token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('calls createOrder with the correct URL, headers, and body', async () => {
    const response = {data: 'data'};
    const order = {
      visit_id: '1',
      items: [],
    };

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await OrdersProvider.createOrder(order, token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...order, ...hashObject(order)}),
    });
  });
});
