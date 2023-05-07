const CryptoJS = require('react-native-crypto-js');

type JsonBody = {
  [key: string]: any;
};

export const hashObject = (jsonBody: JsonBody) => {
  const cleanJsonBody: JsonBody = Object.fromEntries(
    Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
  );

  const sortDict = (obj: JsonBody): JsonBody | any => {
    if (typeof obj === 'object' && obj !== null) {
      const sortedObj: JsonBody = {};
      Object.keys(obj)
        .sort()
        .forEach(key => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            sortedObj[key] = sortDict(obj[key]);
          } else {
            sortedObj[key] = obj[key];
          }
        });
      return sortedObj;
    }
    return obj;
  };

  const sortedJson = sortDict(cleanJsonBody);
  const md5Hash = CryptoJS.MD5(JSON.stringify(sortedJson)).toString();
  return {...cleanJsonBody, hash: md5Hash};
};
