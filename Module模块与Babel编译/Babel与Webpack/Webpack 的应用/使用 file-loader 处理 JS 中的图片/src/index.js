import './index.css';

import img from './img/logo.png';   // 引入图片资源,返回的结果是一个新的图片地址

console.log(img); // 打印图片地址,img/logo.png

const imgEl = document.createElement('img');
imgEl.src = img;
document.body.appendChild(imgEl);
