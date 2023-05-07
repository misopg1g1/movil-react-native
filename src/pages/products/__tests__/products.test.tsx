import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '../../../context/auth.context';
import ProductScreen from '../products.screen';
import {ProductContext} from '../../../context/product.context';

describe('ProductScreen', () => {
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
});
