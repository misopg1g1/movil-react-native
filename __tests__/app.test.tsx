/**
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BackHandler, Settings} from 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-localize');

jest.mock('react-native', () => {
  const originalModule = jest.requireActual('react-native');
  return {
    ...originalModule,
    BackHandler: {
      ...originalModule.BackHandler,
      addEventListener: jest.fn((eventName, handler) => {
        if (eventName === 'hardwareBackPress') {
          setTimeout(() => handler(), 0); // Simulate back button press
        }
      }),
      removeEventListener: jest.fn(),
    },
  };
});

it('renders correctly', async () => {
  renderer.create(<App />);
});
