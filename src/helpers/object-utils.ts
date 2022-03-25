export const ObjectClean = (obj:any) => {
  for (const propName in obj) {
    if (obj.hasOwnProperty(propName)) {
      if (obj[propName] === null) {
        delete obj[propName];
      }
    }
  }
  return obj;
};


export const ObjectArrayKeysJoin = (obj:any) => {
  for (const propName in obj) {
    if (obj.hasOwnProperty(propName) && Array.isArray(obj[propName])) {
      obj[propName] = obj[propName].join(",");
    }
  }
  return obj;
}

export const ObjectIsEmpty = (obj:any) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const ObjectCompare = (obj1:any, obj2:any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const ObjectToUrlParamString = (data:any) => {
  if (Object.keys(data).length > 0) {
    return "?" + Object.keys(data).map(key => key + '=' + data[key]).join('&');
  } else {
    return '';
  }
}
