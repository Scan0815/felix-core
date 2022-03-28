export const FixedEncodeURI = (str: string) => {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
};

export const UserMentionToLink = (string:string, link= '/profile/$1') => {
    const regex = /(?:^|\s)(?:@)([a-zA-Z0-9_\-\.]+)/gm;
    return string.replace(regex, ' <ion-router-link style="--color:#ED4C27" href="'+link+'">@$1</ion-router-link>');
}

export const FixedEncodeURIComponent = (str:string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16)
  })
};

export const FixedDecodeURIComponent = (str:string) => {
  return decodeURIComponent(str);
};

export const FirstLetter = (value:string) => {
    return value?.charAt(0)?.toUpperCase();
};

export const SnakeToCamel = (str:string) => {
  return str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('-', '')
      .replace('_', ''))
};


export const GeneratePassword = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const ConvertServerError = (error:string, validationMessages:any) => {
  const collectedErrors:any[] = [];
  if (error) {
    Object.keys(error).forEach((key) => {
      if (validationMessages.hasOwnProperty(key)) {
        collectedErrors.push(validationMessages[key]);
      }
    });
  }
  return collectedErrors;
};

export const UniqueID = () => {

  function chr4() {
    return Math.random().toString(16).slice(-4);
  }

  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
};

export const LCFirst = (str:string) => {
  return str.replace(/^\w/, c => c.toLowerCase());
};

export const EscapeRegExp = (string:string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const ReplaceAll = (string:string, find:string, replace:string) => {
  return string.replace(new RegExp(EscapeRegExp(find), 'g'), replace);
}
