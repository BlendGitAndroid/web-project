// 写入 Cookie
const set = (name, value, { maxAge, domain, path, secure } = {}) => {
  let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (typeof maxAge === 'number') {
    cookieText += `; max-age=${maxAge}`;
  }

  if (domain) {
    cookieText += `; domain=${domain}`;
  }

  if (path) {
    cookieText += `; path=${path}`;
  }

  if (secure) {
    cookieText += `; secure`;
  }

  document.cookie = cookieText;

  // document.cookie='username=alex; max-age=5; domain='
};

// 通过 name 获取 cookie 的值
const get = name => {
  name = `${encodeURIComponent(name)}`;

  const cookies = document.cookie.split('; ');

  for (const item of cookies) {
    const [cookieName, cookieValue] = item.split('=');

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return;
};

// 'username=alex; age=18; sex=male'
// ["username=alex", "age=18", "sex=male"]
// ["username","alex"]

// get('用户名');

// 根据 name、domain 和 path 删除 Cookie
const remove = (name, { domain, path } = {}) => {
  set(name, '', { domain, path, maxAge: -1 });
};

export { set, get, remove };
