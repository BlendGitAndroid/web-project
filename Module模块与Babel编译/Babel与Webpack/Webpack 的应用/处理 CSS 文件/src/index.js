// polyfill 会转译所有的 JS 新语法，但是文件会变得很大，因为 polyfill 包含了所有的新特性，而不是按需加载
// import '@babel/polyfill'

import './index.css'; // 在JS中引入 CSS 文件，使用 import 语法, 目的是为了让 webpack 打包时能够识别 CSS 文件

import './body.less';

const showMsg = () => {
  // eslint-disable-next-line
    alert('Hello');
};

// eslint-disable-next-line
window.showMsg = showMsg;

// eslint-disable-next-line
console.log('接口地址：', API_BASE_URL);