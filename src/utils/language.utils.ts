import {getLocales} from 'react-native-localize';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export enum SUPPORTED_LANGUAGE_CODES {
  es = 'es',
  en = 'en',
}

export const FALLBACK_LANGUAGE_CODE = 'es';

export interface IContent {
  [FALLBACK_LANGUAGE_CODE]: string;
  [languageCode: string]: string;
}

export type IHTMLChunks = {
  [tag: string]: {
    text: string;
    attributes?: {
      [attributeName: string]: string;
    };
  };
}[];

export interface IParagraph {
  chunks: IHTMLChunks;
  lineBreak?: boolean;
}

export class Language {
  private static dayjsInstance = Language.initDayJs();

  public static getDefaultLanguageCode(): SUPPORTED_LANGUAGE_CODES {
    return SUPPORTED_LANGUAGE_CODES[FALLBACK_LANGUAGE_CODE];
  }

  public static toRelativeDate(datePosted: string): string {
    return this.dayjsInstance(datePosted).fromNow();
  }

  private static initDayJs() {
    dayjs.extend(relativeTime);
    switch (this.getDeviceLanguage()) {
      case SUPPORTED_LANGUAGE_CODES.en: {
        dayjs.locale(SUPPORTED_LANGUAGE_CODES.en);
        return dayjs;
      }
      case SUPPORTED_LANGUAGE_CODES.es: {
        dayjs.locale(SUPPORTED_LANGUAGE_CODES.es);
        return dayjs;
      }
      default:
        dayjs.locale(SUPPORTED_LANGUAGE_CODES.es);
        return dayjs;
    }
  }

  public static getDeviceLanguage(): string {
    const locales = getLocales();
    return locales?.length > 0
      ? locales[0].languageCode
      : FALLBACK_LANGUAGE_CODE;
  }

  public static toCurrency(cents: number): string {
    const price = (cents / 100).toFixed(2).toString();
    return `${price} $`;
  }

  public static translate(
    content?: IContent,
    code?: SUPPORTED_LANGUAGE_CODES | string,
    fallback?: string,
  ): string {
    if (!content) {
      return fallback || '';
    }
    code = code || Language.getDeviceLanguage();
    if (content[code]) {
      return content[code];
    } else if (content[FALLBACK_LANGUAGE_CODE]) {
      return content[FALLBACK_LANGUAGE_CODE];
    } else {
      return fallback || '';
    }
  }
}
