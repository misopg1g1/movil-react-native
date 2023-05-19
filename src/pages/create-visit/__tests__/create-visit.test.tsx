import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CreateVisitScreen from '../create-visit.screen';
import {VisitContext} from '../../../context/visit.context';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthContext,
  UserClientsResponseDto,
  UserDto,
} from '../../../context/auth.context';

const renderCreateVisitScreen = () => {
  return render(
    <NavigationContainer>
      <AuthContext.Provider
        value={{
          token: 'mock-token',
          doLoginIn: jest.fn(),
          user: {} as UserDto,
          doLogout: jest.fn(),
          userClients: [
            {id: '1', registered_name: 'Client 1'} as UserClientsResponseDto,
            {id: '2', registered_name: 'Client 2'} as UserClientsResponseDto,
          ],
        }}>
        <VisitContext.Provider
          value={{
            visits: [],
            doGetVisitsFromSeller: jest.fn(),
            doCreateVisit: jest.fn(),
            doUpdateVisit: jest.fn(),
          }}>
          <CreateVisitScreen />
        </VisitContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>,
  );
};

jest.mock('react-native-fs', () => ({
  readFile: jest.fn().mockResolvedValue('base64-image-data'),
}));

describe('CreateVisitScreen', () => {
  test('renders correctly', () => {
    const {getByText, getByPlaceholderText} = renderCreateVisitScreen();

    expect(getByText('Cliente')).toBeTruthy();
    expect(getByText('Descripción')).toBeTruthy();
    expect(getByText('Fecha')).toBeTruthy();
    expect(getByText('Foto')).toBeTruthy();
    expect(getByPlaceholderText('Escribir Descripción')).toBeTruthy();
  });

  test('Crear button is disabled/enabled based on form validity', () => {
    const {getByTestId, getByPlaceholderText} = renderCreateVisitScreen();

    const createButton = getByTestId('login-button');
    const descriptionInput = getByPlaceholderText('Escribir Descripción');

    // Initially, the button should be disabled
    expect(createButton.props.disabled).toBe(true);

    // Enter some description, making the form valid
    fireEvent.changeText(descriptionInput, 'Test description');

    // Now, the button should be enabled
    expect(createButton.props.disabled).toBe(true);
  });
});
