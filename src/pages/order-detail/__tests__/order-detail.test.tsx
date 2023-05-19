import {render} from '@testing-library/react-native';
import React from 'react';
import OrderDetailScreen from '../order-detail.screen';
import {GetOrderDTO, Item} from '../../../providers/order.provider';
import {Product} from '../../../context/product.context';

jest.mock('../../../context/product.context', () => ({
  useProductContext: jest.fn(() => ({
    products: [
      {
        id: '1',
        img_url: 'http://image.dev',
      },
    ] as Product[],
  })),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('OrderDetailScreen', () => {
  const route = {
    params: {
      order: {
        items: [{id: '1'}] as Item[],
        customer: {
          registered_name: 'Test',
        },
      } as GetOrderDTO,
    },
  };

  it('muestra la información correcta del pedido', () => {
    // Renderiza el componente
    const {getByText} = render(<OrderDetailScreen route={route} />);
    expect(
      getByText(route.params.order.customer.registered_name),
    ).toBeDefined();
  });
});
