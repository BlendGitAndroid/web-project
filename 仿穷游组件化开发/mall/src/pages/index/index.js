// 在入口文件中引入css,webpack会自动处理css文件,因为在webpack.config.js中配置了css-loader
// import './css/reset.css';
import './css/bundle.css';  // 如果所有的组件都拆分了，那么这个css也会被拆分，就不会有这一行了

// 公共样式,在webpack中配置了别名,所以可以直接引入
import 'styles/reset.css';
import 'styles/base.css';
import 'styles/layout.css';

// 页面样式
import './index.css';

// 在入口文件中引入js,webpack会自动处理js文件,因为webpack默认是处理js文件的
import './js/menu';
// import './js/carousel';
import './js/backtotop';

// 引入公共组件，topbar和loading组件
import 'components/topbar';
import 'components/loading';

// import './components/carousel';
import './components/slider';
import './components/jjzyx';
