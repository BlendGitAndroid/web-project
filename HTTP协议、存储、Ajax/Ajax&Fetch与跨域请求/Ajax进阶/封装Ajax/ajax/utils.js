// 工具函数

// 数据序列化成 urlencoded 格式的字符串
const serialize = param => {
  const results = [];

  // Object.entries返回的是一个二维数组，解构出 key 和 value
  // 将param对象转换成数组
  for (const [key, value] of Object.entries(param)) {
    results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  // ['username=alex', 'age=18'];

  // 将数组中的每一项通过&符号连接
  return results.join('&'); //通过&符号连接
};

// 数据序列化成 JSON 格式的字符串
const serializeJSON = param => {
  return JSON.stringify(param);
};

// 给 URL 添加参数
// www.imooc.com?words=js&
const addURLData = (url, data) => {
  if (!data) return '';

  // 判断url中是否已经有参数
  const mark = url.includes('?') ? '&' : '?';

  return `${mark}${data}`;
};

export { serialize, addURLData, serializeJSON };
