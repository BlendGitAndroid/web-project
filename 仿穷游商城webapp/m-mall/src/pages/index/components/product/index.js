import './product.css';

// https://www.imooc.com/api/mall-wepApp/index/product?icode=J6DDC8E3E7A8BF54C

// [{id,url,title,price},{}]

import { getData, getDelayedData } from 'api/getData';
import render from './items.art';
import { URL, LAYOUT_ID } from './config';

// render函数是一个模板渲染函数，它接受一个对象作为参数，这个对象包含了要渲染的数据。
// 在这个例子中，数据被封装在一个名为items的属性中。render函数根据这些数据和预定义的模
// 板生成HTML字符串，然后这个字符串被赋值给目标元素的innerHTML属性，从而将渲染后的内容显
// 示在页面上。
getData(URL).then(data => {
  document.getElementById(LAYOUT_ID).innerHTML = render({
    items: data
  });
});
