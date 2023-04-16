/**
 * @format
 */

import dayjs from 'dayjs';
import {IContent, Language} from '../language.utils';
import * as RNLocalize from 'react-native-localize';

describe('Localize Tests', () => {
  it('Default language is ES', async () => {
    const defaultLanguage = Language.getDefaultLanguageCode();
    expect(defaultLanguage).toEqual('es');
  });

  it('Expect relative date to be localized (in spanish)', async () => {
    const testFecha = dayjs(Date.now())
      .subtract(2, 'years')
      .format('MM-DD-YYYY');
    const localizedDate = Language.toRelativeDate(testFecha);
    expect(localizedDate).toEqual('hace 2 años');
  });

  it('Expect device language to be spanish by default', async () => {
    const deviceLanguage = Language.getDeviceLanguage();
    expect(deviceLanguage).toEqual('es');
  });

  it('Expect to initialize dayjs instance english', async () => {
    const extend = jest.spyOn(dayjs, 'extend');
    const locale = jest.spyOn(dayjs, 'locale');
    const getDeviceLanguage = jest.spyOn(Language, 'getDeviceLanguage');
    getDeviceLanguage.mockReturnValue('en');
    Language.initDayJs();
    expect(extend).toBeCalled();
    expect(getDeviceLanguage).toBeCalled();
    expect(locale).toBeCalledWith('en');
    getDeviceLanguage.mockRestore();
  });

  it('Expect to initialize dayjs instance default and for it to be spanish', async () => {
    const extend = jest.spyOn(dayjs, 'extend');
    const locale = jest.spyOn(dayjs, 'locale');
    const getDeviceLanguage = jest.spyOn(Language, 'getDeviceLanguage');
    getDeviceLanguage.mockReturnValue('xxxx');
    Language.initDayJs();
    expect(extend).toBeCalled();
    expect(getDeviceLanguage).toBeCalled();
    expect(locale).toBeCalledWith('es');
    getDeviceLanguage.mockRestore();
  });

  it('Expect currency to be formated accordingly', async () => {
    const currencyString = Language.toCurrency(1000);
    expect(currencyString).toEqual('10.00 $');
  });

  it('Expect unvalid content to fallback with an empity string', async () => {
    const content = {
      en: 'Test',
    };
    const contentString = Language.translate(content as unknown as IContent);
    expect(contentString).toEqual('');
    const content2 = undefined;
    const contentString2 = Language.translate(content2 as unknown as IContent);
    expect(contentString2).toEqual('');
  });

  it('Expect to return default language if local is not available', () => {
    const content3 = {
      es: 'Test',
    };
    const contentString3 = Language.translate(
      content3 as unknown as IContent,
      'pl',
    );
    expect(contentString3).toEqual('Test');
  });

  it('returns default lenguage in case no valid locales are returned from the mobile device', () => {
    const getLocalesSpy = jest.spyOn(RNLocalize, 'getLocales');
    getLocalesSpy.mockReturnValue([]);
    const language = Language.getDeviceLanguage();
    expect(language).toBe('es');
  });
});
