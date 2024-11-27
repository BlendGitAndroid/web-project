import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 引入全局样式,这里的样式是全局的，会影响到所有的组件
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppStateProvider } from "./AppState"

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
