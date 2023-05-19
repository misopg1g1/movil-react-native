import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import VisitDetailScreen from '../visit-detail.screen';
import {act} from 'react-test-renderer';

jest.mock('../../../context/visit.context', () => ({
  useVisitContext: jest.fn(() => ({
    doUpdateVisit: jest.fn(),
  })),
}));

jest.mock('../../../context/auth.context', () => ({
  useAuthContext: jest.fn(() => ({
    token: 'fake-token',
  })),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
}));

describe('VisitDetailScreen', () => {
  const route = {
    params: {
      visit: {
        id: 1,
        description: 'Description test',
        image_url: '',
        visit_date: '2023-06-01',
        customer: {registered_name: 'Test customer'},
        order_id: '',
      },
    },
  };

  const navigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  it('renders update and create order buttons', () => {
    const {getByText} = render(<VisitDetailScreen route={route} />);

    expect(getByText('Actualizar')).toBeDefined();
    expect(getByText('Crear Orden')).toBeDefined();
  });

  it('fires onPress events on buttons', () => {
    const {getByTestId} = render(
      <VisitDetailScreen route={route} navigation={navigation} />,
    );

    fireEvent.press(getByTestId('update-button'));
    expect(navigation.goBack).toHaveBeenCalled();

    fireEvent.press(getByTestId('create-order-button'));
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
