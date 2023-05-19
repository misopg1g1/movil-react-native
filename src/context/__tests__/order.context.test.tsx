import {render, fireEvent, waitFor} from '@testing-library/react-native';
import React from 'react';
import {OrderProvider, useOrderContext} from '../order.context';
import {Button} from 'react-native';
import {CreateOrderDTO} from '../../providers/order.provider';
import {VisitProvider} from '../visit.context';

// Mockear los alert
jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn(),
  };
});

// Un componente de prueba que llama a las funciones de OrderContext
function TestComponent() {
  const {doGetOrdersFromSeller, doCreateOrder} = useOrderContext();

  return (
    <>
      <Button
        title="Test1"
        testID="getOrders"
        onPress={() => doGetOrdersFromSeller('test_token')}
      />
      <Button
        title="Test2"
        testID="createOrder"
        onPress={() => doCreateOrder({} as CreateOrderDTO, 'test_token')}
      />
    </>
  );
}

describe('OrderProvider', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('debería obtener pedidos del vendedor', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            /* tu array de pedidos aquí */
          ]),
      }),
    );

    const {getByTestId} = render(
      <VisitProvider>
        <OrderProvider>
          <TestComponent />
        </OrderProvider>
      </VisitProvider>,
    );

    fireEvent.press(getByTestId('getOrders'));

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });

  it('debería crear un pedido', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      }),
    );

    const {getByTestId} = render(
      <VisitProvider>
        <OrderProvider>
          <TestComponent />
        </OrderProvider>
      </VisitProvider>,
    );

    fireEvent.press(getByTestId('createOrder'));

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });
});
