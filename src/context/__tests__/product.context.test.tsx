import React from 'react';
import {render, act, renderHook} from '@testing-library/react-native';
import {ProductProvider, useProductContext, Product} from '../product.context';
import {Text} from 'react-native';
import {ProductsProvider} from '../../providers/products.provider';
import {Alert} from 'react-native';
import {Language} from '../../utils/language.utils';
import {authContent} from '../auth.content';

jest.mock('../../providers/products.provider', () => {
  const originalModule = jest.requireActual(
    '../../providers/products.provider',
  );
  return {
    ...originalModule,
    ProductsProvider: {
      ...originalModule.ProductsProvider,
      getAllProducts: jest.fn(),
    },
  };
});

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('../../utils/language.utils', () => {
  const originalModule = jest.requireActual('../../utils/language.utils');
  return {
    ...originalModule,
    Language: {
      ...originalModule.Language,
      translate: jest.fn(),
    },
  };
});

describe('ProductProvider', () => {
  const sampleProducts: Product[] = [
    // ... Add sample product objects here
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent: React.FC = () => {
    const {doGetAllProducts, products} = useProductContext();
    React.useEffect(() => {
      doGetAllProducts('sample-token');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <Text testID={`product-${index}`}>{product.name}</Text>
          </React.Fragment>
        ))}
      </>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads and displays products', async () => {
    (ProductsProvider.getAllProducts as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(sampleProducts),
    });

    const {queryByTestId} = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>,
    );

    // Wait for the async operation to complete
    await act(async () => {});

    sampleProducts.forEach((_, index) => {
      expect(queryByTestId(`product-${index}`)).toBeTruthy();
    });
  });

  it('handles successful response with status 200', async () => {
    (ProductsProvider.getAllProducts as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(sampleProducts),
    });

    const {result} = renderHook(() => useProductContext(), {
      wrapper: ProductProvider,
    });

    await act(async () => {
      await result.current.doGetAllProducts('test_token');
    });

    expect(result.current.products).toEqual(sampleProducts);
  });

  it('handles unsuccessful response with a status other than 200', async () => {
    (ProductsProvider.getAllProducts as jest.Mock).mockResolvedValueOnce({
      status: 400,
      json: () => Promise.resolve({}),
    });

    const {result} = renderHook(() => useProductContext(), {
      wrapper: ProductProvider,
    });

    await act(async () => {
      await result.current.doGetAllProducts('test_token');
    });

    expect(result.current.products).toEqual([]);
    expect(Alert.alert).toHaveBeenCalledWith(
      Language.translate(authContent.alert),
    );
  });

  it('handles error thrown during the API call', async () => {
    (ProductsProvider.getAllProducts as jest.Mock).mockRejectedValueOnce(
      new Error('test error'),
    );

    const {result} = renderHook(() => useProductContext(), {
      wrapper: ProductProvider,
    });

    await act(async () => {
      await result.current.doGetAllProducts('test_token');
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      Language.translate(authContent.error.title),
      Language.translate(authContent.error.description),
    );
  });
});
