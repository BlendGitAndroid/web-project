import 'swiper/swiper-bundle.min.css';
import './slider.css';
import Swiper from 'swiper/swiper-bundle.min';

import config, { SWIPER_CONTAINER_CLASS } from './config';

// https://www.swiper.com.cn/api/index.html
new Swiper(SWIPER_CONTAINER_CLASS, config);
