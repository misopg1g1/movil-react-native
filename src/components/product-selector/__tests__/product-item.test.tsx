import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ProductItem from '../product-item.component';
import {Product} from '../../../context/product.context';

const mockProduct = {
  id: '1',
  name: 'Producto de prueba',
  img_url: 'http://example.com/product.jpg',
  price: 100,
  stock: 5,
} as Product;

describe('ProductItem', () => {
  it('renders correctly', () => {
    const setSelectedProducts = jest.fn();

    const {getByText} = render(
      <ProductItem
        product={mockProduct}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={[]}
      />,
    );

    expect(getByText('Producto de prueba')).toBeTruthy();
    expect(getByText('1.00 $')).toBeTruthy();
  });

  it('increases and decreases counter correctly', () => {
    const setSelectedProducts = jest.fn();

    const {getByTestId} = render(
      <ProductItem
        product={mockProduct}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={[]}
      />,
    );

    // Increase the counter
    fireEvent.press(getByTestId('plus'));
    expect(setSelectedProducts).toHaveBeenCalledWith([
      {...mockProduct, quantity: 1},
    ]);

    // Decrease the counter
    fireEvent.press(getByTestId('minus'));
    expect(setSelectedProducts).toHaveBeenCalledWith([
      {...mockProduct, quantity: 0},
    ]);
  });
});
