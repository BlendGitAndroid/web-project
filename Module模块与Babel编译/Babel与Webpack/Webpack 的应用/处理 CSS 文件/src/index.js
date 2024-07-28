// polyfill 会转译所有的 JS 新语法，但是文件会变得很大，因为 polyfill 包含了所有的新特性，而不是按需加载
// import '@babel/polyfill'

import './index.css'; // 在JS中引入 CSS 文件，使用 import 语法, 目的是为了让 webpack 打包时能够识别 CSS 文件

import './body.less';

import $ from 'jquery';

import about from './about.md'; // 引入 markdown 文件

const showMsg = () => {
  // eslint-disable-next-line
  alert('Hello');
};

// eslint-disable-next-line
window.showMsg = showMsg;

// eslint-disable-next-line
// if (API_BASE_URL) {
//   console.log('接口地址：', API_BASE_URL);
// }

// 给 body 添加一个页脚(包含备案号)
$('body').append('<h3>备案号：XXXXXXX</h3>');

// 3. 代码分离：动态导入。验证按需加载(先关闭ESLintPlugin插件，否则会报错)
// eslint-disable-next-line
document.getElementById('btn').onclick = function () {
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称
  // webpackPrefetch: true 启动预加载，如果不加这个参数，就是懒加载
  // 预加载和懒加载的区别：在network中可以看到，预加载是在页面加载完毕后会加载wp.js文件，懒加载是点击按钮后才加载wp.js文件
  import(/* webpackChunkName: 'desc', webpackPrefetch: true */'./wp').then(({ desc }) => {
    alert(desc())
  })
};

console.log(about);
$('body').append(about);
