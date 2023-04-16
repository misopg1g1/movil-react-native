const getLocales = () => [
  // You can choose any locale you want to test
  {countryCode: 'MX', languageTag: 'es-MX', languageCode: 'es', isRTL: false},
  {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
];

const findBestAvailableLanguage = () => ({
  languageTag: 'es-MX',
  isRTL: false,
});

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

const getCalendar = () => 'gregorian';
const getCountry = () => 'MX';
const getCurrencies = () => ['MXN'];
const getTemperatureUnit = () => 'celsius';
const getTimeZone = () => 'America/New_York';
const uses24HourClock = () => true;
const usesMetricSystem = () => false;

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener,
};
