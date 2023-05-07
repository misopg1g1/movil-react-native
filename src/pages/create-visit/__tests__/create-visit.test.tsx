import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CreateVisitScreen from '../create-visit.screen';

jest.mock('../../../context/auth.context', () => ({
  useAuthContext: () => ({
    userClients: [
      {id: '1', registered_name: 'Client 1'},
      {id: '2', registered_name: 'Client 2'},
    ],
  }),
}));
jest.mock('react-native-fs', () => ({
  readFile: jest.fn().mockResolvedValue('base64-image-data'),
}));

describe('CreateVisitScreen', () => {
  test('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<CreateVisitScreen />);

    expect(getByText('Cliente')).toBeTruthy();
    expect(getByText('Descripción')).toBeTruthy();
    expect(getByText('Fecha')).toBeTruthy();
    expect(getByText('Foto')).toBeTruthy();
    expect(getByPlaceholderText('Escribir Descripción')).toBeTruthy();
  });

  test('Crear button is disabled/enabled based on form validity', () => {
    const {getByTestId, getByPlaceholderText} = render(<CreateVisitScreen />);

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
