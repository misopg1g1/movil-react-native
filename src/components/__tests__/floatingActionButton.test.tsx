import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {FloatingActionButton} from '../floatinActionButton.component';

describe('FloatingActionButton', () => {
  const onPressMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <FloatingActionButton onPress={onPressMock} />,
    );

    const button = getByTestId('floating-action-button');
    expect(button).toBeTruthy();
  });

  it('triggers onPress when button is pressed', () => {
    const {getByTestId} = render(
      <FloatingActionButton onPress={onPressMock} />,
    );

    const button = getByTestId('floating-action-button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
