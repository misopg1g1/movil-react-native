const CryptoJS = require('react-native-crypto-js');

type JsonBody = {
  [key: string]: any;
};

export const hashObject = (jsonBody: JsonBody) => {
  const cleanJsonBody: JsonBody = Object.fromEntries(
    Object.entries(jsonBody).filter(([key]) => key !== 'hash'),
  );
  const sortedKeys = Object.keys(cleanJsonBody).sort();
  const jsonString = sortedKeys
    .map(
      (key, index) =>
        `"${key}": "${cleanJsonBody[key]}"${
          index < sortedKeys.length - 1 ? ', ' : ''
        }`,
    )
    .join('');

  const wrappedJsonString = `{${jsonString}}`;
  const md5Hash = CryptoJS.MD5(wrappedJsonString).toString();
  console.log('here', md5Hash);
  return {...cleanJsonBody, hash: md5Hash};
};
