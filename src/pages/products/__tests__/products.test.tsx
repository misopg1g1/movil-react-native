import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthContext,
  AuthProvider,
  UserDto,
} from '../../../context/auth.context';
import ProductScreen, {SearchHeader} from '../products.screen';
import {Product, ProductContext} from '../../../context/product.context';
import {Language} from '../../../utils/language.utils';
import {productContent} from '../products.content';

describe('ProductScreen', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      img_url: 'https://example.com/img1.jpg',
      price: 10,
      stock: 5,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      img_url: 'https://example.com/img2.jpg',
      price: 20,
      stock: 0,
    },
  ];

  const renderProductsScreen = () => {
    return render(
      <AuthContext.Provider
        value={{
          token: 'mock-token',
          doLoginIn: jest.fn(),
          user: {} as UserDto,
          doLogout: jest.fn(),
          userClients: [],
        }}>
        <ProductContext.Provider
          value={{
            doGetAllProducts: jest.fn(),
            products: mockProducts as Product[],
          }}>
          <ProductScreen />
        </ProductContext.Provider>
      </AuthContext.Provider>,
    );
  };
  it('displays the products page', () => {
    const mockContextValue = {
      doGetAllProducts: jest.fn(),
      products: [],
    };
    const ProductContextMocked = ({children}: {children: React.ReactNode}) => (
      <ProductContext.Provider value={mockContextValue}>
        {children}
      </ProductContext.Provider>
    );
    const {getByText} = render(
      <NavigationContainer>
        <AuthProvider>
          <ProductContextMocked>
            <ProductScreen />
          </ProductContextMocked>
        </AuthProvider>
      </NavigationContainer>,
    );

    expect(getByText('Productos')).toBeTruthy();
  });

  it('renders the products with stock available', () => {
    const {getByText, queryByText} = renderProductsScreen();
    expect(getByText('Product 1')).toBeTruthy();
    expect(queryByText('Product 2')).toBeNull();
  });

  it('filters products based on the search input', () => {
    const {queryByText, getByPlaceholderText} = renderProductsScreen();
    fireEvent.changeText(
      getByPlaceholderText(
        Language.translate(productContent.searchPlaceholder),
      ),
      'Product 1',
    );

    expect(queryByText('Product 1')).toBeTruthy();
  });
});

describe('SearchHeader', () => {
  it('renders the SearchHeader component', () => {
    const setSearchPrompt = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchHeader setSearchPrompt={setSearchPrompt} />,
    );
    const searchInput = getByPlaceholderText(
      Language.translate(productContent.searchPlaceholder),
    );

    expect(searchInput).toBeTruthy();
  });

  it('calls setSearchPrompt with input value when text changes', () => {
    const setSearchPrompt = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchHeader setSearchPrompt={setSearchPrompt} />,
    );
    const searchInput = getByPlaceholderText(
      Language.translate(productContent.searchPlaceholder),
    );

    fireEvent.changeText(searchInput, 'test search');

    expect(setSearchPrompt).toHaveBeenCalledWith('test search');
  });
});
