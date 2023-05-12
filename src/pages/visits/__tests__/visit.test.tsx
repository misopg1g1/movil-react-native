import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VisitsScreen from '../visits.screen';
import {VisitContext} from '../../../context/visit.context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, UserDto} from '../../../context/auth.context';
import {VisitGetDto} from '../../../providers/visits.provider';

const mockNavigate = jest.fn();

const renderVisitScreen = () => {
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
        <VisitContext.Provider
          value={{
            visits: [
              {
                id: '1',
                visit_date: '11-12-2023',
                customer: {registered_name: 'Platanitos Col'},
              } as VisitGetDto,
              {
                id: '2',
                visit_date: '11-12-2023',
                customer: {registered_name: 'El man abarrotero'},
              } as VisitGetDto,
            ],
            doGetVisitsFromSeller: jest.fn(),
            doCreateVisit: jest.fn(),
          }}>
          <VisitsScreen />
        </VisitContext.Provider>
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

describe('VisitsScreen', () => {
  it('displays the visits page', () => {
    const {getByText} = renderVisitScreen();

    expect(getByText('Visitas')).toBeTruthy();
  });

  it('filters visits list based on search input', () => {
    const {getByPlaceholderText, getByText, queryByText} = renderVisitScreen();

    fireEvent.changeText(getByPlaceholderText('Buscar'), 'Platanitos Col');

    expect(getByText('Platanitos Col')).toBeTruthy();
    expect(queryByText('El man abarrotero')).toBeNull();
  });

  it('navigates to CreateVisit screen when FloatingActionButton is pressed', () => {
    const {getByTestId} = renderVisitScreen();

    fireEvent.press(getByTestId('floating-action-button'));

    expect(mockNavigate).toHaveBeenCalledWith('CreateVisit');
  });
});
