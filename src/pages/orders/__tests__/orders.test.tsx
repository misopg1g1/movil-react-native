import React from 'react';
import {render} from '@testing-library/react-native';
import OrdersScreen from '../orders.screen';

describe('LoginScreen', () => {
  it('displays the login form correctly', () => {
    const {getByText} = render(<OrdersScreen />);

    expect(getByText('orders.screen')).toBeTruthy();
  });
});
