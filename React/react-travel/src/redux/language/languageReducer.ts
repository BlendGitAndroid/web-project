import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[]; // js中能这样定义数组
}

// 定义初始值
const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

// 创建语言切换的reducer，传入默认state和action，返回新的state
// reducer是一个纯函数，接收旧的state和action，返回新的state，根据action的type来判断如何处理state
export default (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload); // 国际化处理，这样处理是不标准的，有副作用
      return { ...state, language: action.payload };  // 返回新的state，创建新的对象
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],  // 返回新的list
      };
    default:
      return state;
  }
};
