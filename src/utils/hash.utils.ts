const CryptoJS = require('react-native-crypto-js');

type JsonBody = {
  [key: string]: any;
};

export const hashObject = (jsonBody: JsonBody) => {
  const cleanJsonBody: JsonBody = Object.fromEntries(
    Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
  );

  const sortDict = (obj: JsonBody): JsonBody | any => {
    if (Array.isArray(obj)) {
      return obj.map(item => sortDict(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const sortedObj: JsonBody = {};
      Object.keys(obj)
        .sort()
        .forEach(key => {
          sortedObj[key] = sortDict(obj[key]);
        });
      return sortedObj;
    }
    return obj;
  };

  const sortedJson = sortDict(cleanJsonBody);
  const md5Hash = CryptoJS.MD5(JSON.stringify(sortedJson)).toString();
  return {...cleanJsonBody, hash: md5Hash};
};
