import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CustomTextInput from '../custom-text-input.component';

describe('CustomTextInput', () => {
  const placeholder = 'Enter text';
  const label = 'Input label';
  const iconName = 'md-text';
  const onChangeTextMock = jest.fn();
  const validateMock = jest.fn(text => text.length >= 3);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <CustomTextInput
        placeholder={placeholder}
        label={label}
        iconName={iconName}
        onChangeText={onChangeTextMock}
        validate={validateMock}
      />,
    );

    expect(getByText(label)).toBeTruthy();
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('triggers onChangeText and validate on input change', () => {
    const {getByPlaceholderText} = render(
      <CustomTextInput
        placeholder={placeholder}
        label={label}
        iconName={iconName}
        onChangeText={onChangeTextMock}
        validate={validateMock}
      />,
    );

    const input = getByPlaceholderText(placeholder);
    fireEvent.changeText(input, 'abc');

    expect(onChangeTextMock).toHaveBeenCalledWith('abc');
    expect(validateMock).toHaveBeenCalledWith('abc');
  });
});
