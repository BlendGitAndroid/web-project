
// 声明action的type常量
export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

// 定义action的类型接口
interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}

// 定义action的类型接口
interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

// 定义action的混合类型
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

// 定义action的创建函数，返回的是一个对象
export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

// 定义action的创建函数，返回的是一个对象
export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
