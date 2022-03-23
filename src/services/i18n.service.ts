import {StorageService} from './storage.service';

let allowedLanguage = ['en'];
let currentLocale = StorageService.get('locale');

class I18n {
  translation = {};
  result: string;
  d = (text) => {
    this.translation[allowedLanguage[0]] = text;
    return this;
  }
  t = (lang, text) => {
    this.translation[lang] = text;
    return this;
  }
  get = (key = null, replace?) => {
    let result;
    if (key) {
      result = this.translation[currentLocale][key]
    } else {
      result = this.translation[currentLocale]
    }
    if (replace) {
      for (const [key, value] of Object.entries(replace)) {
        if (result) {
          result = result.replaceAll(key, value);
        }
      }
    }
    return result;
  }
}

export const SetAllowedLanguage = (allowed = []) => {
  allowedLanguage = [];
  allowed.forEach((lang) => {
    allowedLanguage.push(lang);
  })
}

const checkIfLocaleAllowed = () => {
  return new RegExp('^(' + allowedLanguage.join('|') + ')$', 'i');
}

export const Locale = (lang, overwrite = false) => {
  currentLocale = StorageService.get('locale');
  if (!currentLocale || overwrite ||
    !checkIfLocaleAllowed().test(currentLocale)) {
    if (lang && checkIfLocaleAllowed().test(lang.substr(0, 2))) {
      currentLocale = lang.substr(0, 2);
    } else {
      currentLocale = allowedLanguage[0]
    }
    StorageService.set('locale', currentLocale);
  }
  const htmlLang = document.querySelector('html');
  if (htmlLang) {
    htmlLang.lang = currentLocale;
  }
}

export const getCurrentLocale = () => {
  return currentLocale;
}

export const i18n = (d) => {
  return new I18n().d(d);
}
