import React from 'react';
import {render} from '@testing-library/react-native';

import CustomDatePicker from '../custom-date-picker.component';

describe('CustomDatePicker', () => {
  const label = 'Choose a date';
  const iconName = 'md-calendar';
  const initialDate = new Date('2023-05-01');
  const onDateChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <CustomDatePicker
        label={label}
        iconName={iconName}
        date={initialDate}
        onDateChange={onDateChangeMock}
      />,
    );

    expect(getByText(label)).toBeTruthy();
  });
});
