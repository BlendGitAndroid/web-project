import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import "./i18n/configs";  // 引入i18n配置，初始化i18n
import { Provider } from "react-redux";
import rootStore from "./redux/store";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

// 设置axios的默认请求头
axios.defaults.headers["x-icode"] = "FB80558A73FA658E";


// 注意看上面，使用i18n的时候，我们需要引入i18n的配置文件，然后在index.tsx中引入i18n的配置文件，这样就可以初始化i18n了。

ReactDOM.render(
  <React.StrictMode>
    {/* 使用Provider包裹App，使App组件中的所有子组件都能访问到store */}
    <Provider store={rootStore.store}>
      {/* 使用PersistGate包裹App，使store中的数据能够持久化存储 */}
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
