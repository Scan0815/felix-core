import moment, {MomentBuiltinFormat} from 'moment';
// @ts-ignore
const processRelativeTime = (number, withoutSuffix, key, isFuture) => {
  const format = {
    m: ['eine Minute', 'einer Minute'],
    h: ['eine Stunde', 'einer Stunde'],
    d: ['ein Tag', 'einem Tag'],
    dd: [number + ' Tage', number + ' Tagen'],
    w: ['eine Woche', 'einer Woche'],
    M: ['ein Monat', 'einem Monat'],
    MM: [number + ' Monate', number + ' Monaten'],
    y: ['ein Jahr', 'einem Jahr'],
    yy: [number + ' Jahre', number + ' Jahren'],
  };
  return withoutSuffix ? format[key][0] : format[key][1];
}
moment.defineLocale('de', {
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
    '_'
  ),
  monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split(
    '_'
  ),
  monthsParseExact: true,
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split(
    '_'
  ),
  weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[heute]',
    sameElse: 'L',
    nextDay: '[morgen um] LT [Uhr]',
    nextWeek: 'dddd [um] LT [Uhr]',
    lastDay: '[gestern]',
    lastWeek: 'L',
  },
  relativeTime: {
    future: 'in %s',
    past: 'vor %s',
    s: 'ein paar Sekunden',
    ss: '%d Sekunden',
    m: processRelativeTime,
    mm: '%d Minuten',
    h: processRelativeTime,
    hh: '%d Stunden',
    d: processRelativeTime,
    dd: processRelativeTime,
    w: processRelativeTime,
    M: processRelativeTime,
    MM: processRelativeTime,
    y: processRelativeTime,
    yy: processRelativeTime,
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  // @ts-ignore
  ordinal: '%d.',
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});


export const Calender = (date) => {
  const stillUtc = moment.utc(date);
  return stillUtc.local().calendar();
};

export const Ago = (date) => {
  const stillUtc = moment.utc(date);
  return stillUtc.local().fromNow();
};


export const AddDays = (date, toDateFormat = 'YYYY-MM-DD', addValue, unit = "days") => {
  const stillUtc = moment.utc(date, toDateFormat);
  return stillUtc.local().add(addValue, unit).format(toDateFormat);
};

export const GetStartOf = (unitOfTime, date?, toDateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const stillUtc = moment.utc(date);
  return stillUtc.startOf(unitOfTime).format(toDateFormat);
};

export const GetEndOf = (unitOfTime, date?, toDateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).endOf(unitOfTime).format(toDateFormat);
};

export const GetDateStartFormatSubtract = (amount, unit, unitOfTime, date?, toDateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).subtract(amount, unit).startOf(unitOfTime).format(toDateFormat);
};

export const GetDateFormat = (date?, toDateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const stillUtc = moment.utc(date);
  return stillUtc.local().format(toDateFormat);
};

export const GetDateToUnix = (date?) => {
  const stillUtc = moment.utc(date);
  return stillUtc.unix();
};

export const ConvertDateFormat = (date, fromDateFormat: string | MomentBuiltinFormat = 'YYYY:MM:DD HH:mm:ss', toDateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const stillUtc = moment.utc(date, fromDateFormat);
  return stillUtc.local().format(toDateFormat);
};

export const ConvertToIso = (date) => {
  return moment(date).toISOString()
}
