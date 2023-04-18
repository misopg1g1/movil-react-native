const CryptoJS = require('react-native-crypto-js');

type JsonBody = {
  [key: string]: any;
};

export const hashObject = (jsonBody: JsonBody) => {
  const cleanJsonBody: JsonBody = Object.fromEntries(
    Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
  );

  const sortDict = (obj: JsonBody) => {
    if (typeof obj === 'object' && obj !== null) {
      const sortedObj: JsonBody = {};
      Object.keys(obj)
        .sort()
        .forEach(key => {
          sortedObj[key] = obj[key];
        });
      return sortedObj;
    }
    return obj;
  };
  const sortedJson = sortDict(cleanJsonBody);
  const md5Hash = CryptoJS.MD5(sortedJson).toString();
  return {...cleanJsonBody, hash: md5Hash};
};
