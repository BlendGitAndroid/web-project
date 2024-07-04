import Header from 'components/header';
import 'components/searchbox';

const scrollContainer = document.getElementById('index-page');  //获取首页的id
const headerEl = scrollContainer.querySelector('.header');  // 在首页上查询header选择器

new Header(headerEl, 0, scrollContainer);
