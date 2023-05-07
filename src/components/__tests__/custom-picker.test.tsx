import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CustomPicker from '../custom-picker.component';

describe('CustomPicker', () => {
  const label = 'Select an option';
  const iconName = 'md-chevron-down';
  const items = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
  ];

  const onValueChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <CustomPicker
        label={label}
        iconName={iconName}
        items={items}
        selectedValue={undefined}
        onValueChange={onValueChangeMock}
      />,
    );

    expect(getByText(label)).toBeTruthy();
  });

  it('calls onValueChange when a value is selected', () => {
    const {getByTestId} = render(
      <CustomPicker
        label={label}
        iconName={iconName}
        items={items}
        selectedValue={undefined}
        onValueChange={onValueChangeMock}
      />,
    );

    fireEvent(getByTestId('picker'), 'onValueChange', 'option1');

    expect(onValueChangeMock).toHaveBeenCalledWith('option1');
  });

  // Add any additional test cases here
});
