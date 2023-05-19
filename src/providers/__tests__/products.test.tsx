import {ProductsProvider} from '../products.provider';

global.fetch = jest.fn();

const token = 'test-token';
const API_ENDPOINT = `https://stagingapi.edgarluna.dev/products`;

describe('ProductsProvider', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('calls getAllProducts with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await ProductsProvider.getAllProducts(token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });
});
