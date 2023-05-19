import React from 'react';
import {render} from '@testing-library/react-native';

import ProductSelector from '../product-selector.component';

jest.mock('../product-selector/product-item.component', () => 'ProductItem');

const mockProducts = [
  {id: '1', name: 'Producto 1', stock: 2},
  {id: '2', name: 'Producto 2', stock: 0},
  {id: '3', name: 'Producto 3', stock: 1},
];

// Mock your context
jest.mock('../../context/product.context', () => ({
  useProductContext: () => ({
    products: mockProducts,
  }),
}));

describe('ProductSelector', () => {
  test('renders correctly with products', () => {
    const setSelectedProducts = jest.fn();

    const {getByText} = render(
      <ProductSelector
        setSelectedProducts={setSelectedProducts}
        selectedProducts={[]}
      />,
    );

    expect(getByText('Productos')).toBeTruthy();
  });

  test('does not render products with stock of 0', () => {
    const setSelectedProducts = jest.fn();

    const {queryByText} = render(
      <ProductSelector
        setSelectedProducts={setSelectedProducts}
        selectedProducts={[]}
      />,
    );

    expect(queryByText('Producto 2')).toBeNull();
  });
});
