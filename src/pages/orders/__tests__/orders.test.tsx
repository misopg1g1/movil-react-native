import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import OrdersScreen from '../orders.screen';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, UserDto} from '../../../context/auth.context';
import {OrderContext} from '../../../context/order.context';
import {GetOrderDTO} from '../../../providers/order.provider';

const mockNavigate = jest.fn();

const renderOrdersScreen = () => {
  return render(
    <NavigationContainer>
      <AuthContext.Provider
        value={{
          token: 'mock-token',
          doLoginIn: jest.fn(),
          user: {} as UserDto,
          doLogout: jest.fn(),
          userClients: [],
        }}>
        <OrderContext.Provider
          value={{
            orders: [
              {
                id: '1',
                customer: {registered_name: 'Platanitos Col'},
              } as GetOrderDTO,
              {
                id: '2',
                customer: {registered_name: 'El man abarrotero'},
              } as GetOrderDTO,
            ],
            doCreateOrder: jest.fn(),
            doGetOrdersFromSeller: jest.fn(),
          }}>
          <OrdersScreen />
        </OrderContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>,
  );
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('OrdersScreen', () => {
  it('displays the visits page', () => {
    const {getByText} = renderOrdersScreen();

    expect(getByText('Órdenes')).toBeTruthy();
  });

  it('filters orders list based on search input', () => {
    const {getByPlaceholderText, getByText, queryByText} = renderOrdersScreen();

    fireEvent.changeText(getByPlaceholderText('Buscar'), 'Platanitos Col');

    expect(getByText('Platanitos Col')).toBeTruthy();
    expect(queryByText('El man abarrotero')).toBeNull();
  });
});
