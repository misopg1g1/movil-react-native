import React from 'react';
import {render} from '@testing-library/react-native';

import ProductModal from '../product-modal.component';

jest.mock('../product-selector.component', () => 'ProductSelector');


describe('ProductModal', () => {
  test('renders correctly', () => {
    const setSelectedProducts = jest.fn();

    const {getByTestId} = render(
      <ProductModal
        close={jest.fn()}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={[]}
      />,
    );

    expect(getByTestId('header-modal')).toBeTruthy();
  });
});
