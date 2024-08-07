import { SUCC_CODE, TIMEOUT } from 'api/config';
import { getJSON } from './ajax';
import product from "./index-product.json"

// 获取数据
const getData = (url, options) => {
  const ajaxPromise = getJSON(url, { timeoutTime: TIMEOUT, ...options });
  const resultPromise = ajaxPromise
    .then(response => {
      if (response.code !== SUCC_CODE) {
        console.log('Error: ' + response.msg);
        return product.data;
      };

      return response.data;
    })
    .catch(err => console.log(err));

  resultPromise.xhr = ajaxPromise.xhr;

  return resultPromise;
};

// 延时
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// 获取延迟的数据
const getDelayedData = (url, options) => {
  return delay(1000).then(() => {
    return getData(url, options);
  });
};

export { getData, getDelayedData };
