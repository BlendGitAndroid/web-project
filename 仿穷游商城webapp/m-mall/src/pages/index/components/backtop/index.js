import Backtop from 'components/backtop';

// 获取滚动容器，就是整个页面，而不是浏览器窗口
const scrollContainer = document.getElementById('index-page');
const backtopEl = scrollContainer.querySelector('.backtop');

new Backtop(backtopEl, 0, scrollContainer);
