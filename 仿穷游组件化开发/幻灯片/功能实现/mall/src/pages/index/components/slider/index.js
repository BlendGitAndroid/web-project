import './slider.css';
import './btn.css';

import Slider from './module';

const slider = new Slider(document.querySelector('.slider'), {
  initialIndex: 1,
  animation: true,
  // 切换速度，单位 ms
  speed: 300,
  // 自动切换，单位 ms
  autoplay: 0
});

const bannerEl = document.getElementById('banner');
const leftbtnEl = document.getElementById('leftbtn');
const rightbtnEl = document.getElementById('rightbtn');

leftbtnEl.addEventListener(
  'click',
  () => {
    slider.prev();
  },
  false
);
rightbtnEl.addEventListener(
  'click',
  () => {
    slider.next();
  },
  false
);

bannerEl.addEventListener(
  'mouseenter',
  () => {
    slider.pause();
  },
  false
);
bannerEl.addEventListener(
  'mouseleave',
  () => {
    slider.autoplay();
  },
  false
);
