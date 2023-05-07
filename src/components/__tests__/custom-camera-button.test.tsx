import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomCameraButton from '../custom-camera-button.component';

describe('CustomCameraButton', () => {
  const onCaptureMock = jest.fn();
  const labelText = 'Test Label';

  test('renders label correctly', () => {
    const {getByText} = render(
      <CustomCameraButton label={labelText} onCapture={onCaptureMock} />,
    );
    expect(getByText(labelText)).toBeTruthy();
  });

  test('renders placeholder texts correctly', () => {
    const {getByText} = render(
      <CustomCameraButton label={labelText} onCapture={onCaptureMock} />,
    );
    expect(getByText('Agregar Imagen')).toBeTruthy();
    expect(getByText('Click para seleccionar una imagen')).toBeTruthy();
  });

  test('opens the camera when the button is pressed', () => {
    const {getByTestId} = render(
      <CustomCameraButton label={labelText} onCapture={onCaptureMock} />,
    );
    fireEvent.press(getByTestId('camera-button'));
    expect(getByTestId('camera-screen')).toBeTruthy();
  });

  test('closes the modal when the close button is pressed', () => {
    const {getByTestId} = render(
      <CustomCameraButton label={labelText} onCapture={onCaptureMock} />,
    );
    fireEvent.press(getByTestId('camera-button'));

    const cameraScreenModal = getByTestId('camera-screen');
    cameraScreenModal.props.onRequestClose();
    expect(cameraScreenModal.props.visible).toBe(false);
  });

  test('call on capture function with test uri', () => {
    const {getByTestId} = render(
      <CustomCameraButton label={labelText} onCapture={onCaptureMock} />,
    );
    fireEvent.press(getByTestId('camera-button'));
    fireEvent.press(getByTestId('camera-screen-capture-button'));
    expect(onCaptureMock).toHaveBeenCalledWith('your-image-uri');
  });
});
