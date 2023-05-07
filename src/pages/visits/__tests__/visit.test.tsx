import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VisitsScreen from '../visits.screen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('ProductsScreen', () => {
  it('displays the visits page', () => {
    const {getByText} = render(<VisitsScreen />);

    expect(getByText('Visitas')).toBeTruthy();
  });

  it('filters visits list based on search input', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <VisitsScreen />,
    );

    fireEvent.changeText(getByPlaceholderText('Buscar'), 'Platanitos Col');

    expect(getByText('Platanitos Col')).toBeTruthy();
    expect(queryByText('El man abarrotero')).toBeNull();
  });

  it('navigates to CreateVisit screen when FloatingActionButton is pressed', () => {
    const {getByTestId} = render(<VisitsScreen />);

    fireEvent.press(getByTestId('floating-action-button'));

    expect(mockNavigate).toHaveBeenCalledWith('CreateVisit');
  });
});
