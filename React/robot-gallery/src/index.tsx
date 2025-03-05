import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 引入全局样式,这里的样式是全局的，会影响到所有的组件
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppStateProvider } from "./AppState"

// React 是一个用于构建用户界面的 javascript 库。
// 1. 创建虚拟DOM
// 2. 组件化
// 3. 单向数据路

// 帮助渲染虚拟DOM
ReactDOM.render(
  <React.StrictMode>
    {/* Context知识点，通过AppStateProvider包裹App组件，使得App组件可以访问到全局状态 */}
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 之前一直不理解React和webpack的关系，现在知道了。
// 1. webpack是一个模块打包工具，它可以将多个模块打包成一个文件。
// 2. React是一个用于构建用户界面的javascript库。
// 3. 所以webpack可以将React打包成一个文件，然后在html中引入这个文件，就可以使用React了。
