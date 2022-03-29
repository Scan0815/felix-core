import {StorageService} from './storage.service';
import {ReplaceAll} from "../helpers/string-utils";

let allowedLanguage = ['en'];
let currentLocale = StorageService.get('locale');

class I18n {
  translation:any= {};
  d = (text:any) => {
    this.translation[allowedLanguage[0]] = text;
    return this;
  }
  t = (lang:string, text:any) => {
    this.translation[lang] = text;
    return this;
  }
  get = (key = null, replace?:{[key:string]:string}) => {
    let result: string;
    if (key) {
      result = this.translation[currentLocale][key]
    } else {
      result = this.translation[currentLocale]
    }
    if (replace) {
      for (const [key, value] of Object.entries(replace)) {
        if (result) {
          result = ReplaceAll(result, key, value);
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

export const Locale = (lang:string, overwrite = false) => {
  currentLocale = StorageService.get('locale');
  if (!currentLocale || overwrite ||
    !checkIfLocaleAllowed().test(currentLocale)) {
    if (lang && checkIfLocaleAllowed().test(lang.substring(0, 2))) {
      currentLocale = lang.substring(0, 2);
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

export const i18n = (d:any) => {
  return new I18n().d(d);
}
