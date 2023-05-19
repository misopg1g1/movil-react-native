import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ProductList from '../product-list.component';
import {Product} from '../../context/product.context';

const mockProducts = [
  {
    id: '1',
    name: 'Producto 1',
    img_url: 'http://image.com',
    price: 10,
    sku: 'sku1',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Producto 2',
    img_url: 'http://image.com',
    price: 20,
    sku: 'sku2',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Producto 3',
    img_url: 'http://image.com',
    price: 30,
    sku: 'sku3',
    quantity: 1,
  },
] as (Product & {quantity: number})[];

describe('ProductList', () => {
  test('renders correctly with products', () => {
    const {getByText} = render(
      <ProductList
        selectedProducts={mockProducts}
        shouldShowEditProperties={true}
        shouldShowTotalFooter={true}
      />,
    );

    expect(getByText('Producto 1')).toBeTruthy();
    expect(getByText('Producto 3')).toBeTruthy();
  });

  test('does not render products with quantity of 0', () => {
    const {queryByText} = render(
      <ProductList
        selectedProducts={mockProducts}
        shouldShowEditProperties={true}
        shouldShowTotalFooter={true}
      />,
    );

    expect(queryByText('Producto 2')).toBeNull();
  });

  test('should open modal when pressing the plus icon', () => {
    const setModalOn = jest.fn();
    const {getByTestId} = render(
      <ProductList
        selectedProducts={mockProducts}
        setModalOn={setModalOn}
        shouldShowEditProperties={true}
        shouldShowTotalFooter={true}
      />,
    );

    fireEvent.press(getByTestId('plus-circle'));
    expect(setModalOn).toHaveBeenCalledWith(true);
  });
});
