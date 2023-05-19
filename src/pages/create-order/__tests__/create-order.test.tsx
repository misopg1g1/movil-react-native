import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import CreateOrderScreen from '../create-order.screen';

// Mock de los contextos y navegación
jest.mock('../../../context/order.context', () => ({
  useOrderContext: jest.fn(() => ({
    doCreateOrder: jest.fn(),
  })),
}));

jest.mock('../../../context/auth.context', () => ({
  useAuthContext: jest.fn(() => ({
    token: 'test_token',
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

describe('CreateOrderScreen', () => {
  const route = {
    params: {
      visitId: 'test_visitId',
    },
  };

  it('se renderea correctamente', () => {
    const {getByTestId} = render(<CreateOrderScreen route={route} />);
    expect(getByTestId('root-create-order')).toBeDefined();
  });
});
