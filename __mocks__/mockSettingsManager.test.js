import {NativeModules} from 'react-native';

NativeModules.SettingsManager = {
  settings: {
    AppleLocale: 'en_US',
    AppleLanguages: ['en-US'],
  },
  getConstants: function () {
    return {
      settings: {
        AppleLocale: 'en_US',
        AppleLanguages: ['en-US'],
      },
    };
  },
};
