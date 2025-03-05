import i18n from "i18next";
import {ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes} from "./languageActions";

export interface LanguageState {
    language: "en" | "zh";
    languageList: { name: string; code: string }[]; // js中能这样定义数组
}

// 定义初始值
const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        {name: "中文", code: "zh"},
        {name: "English", code: "en"},
    ],
};

// 创建语言切换的reducer，传入默认state和action，返回新的state
// reducer是一个纯函数，接收旧的state和action，返回新的state，根据action的type来判断如何处理state
export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            // 为什么说这里有副作用?
            // 在 Redux 中，Reducer 是一个纯函数，它接收当前的状态和一个动作（action），并返回一个新的状态。纯函数的定义是：
            // 对于相同的输入，总是返回相同的输出，并且没有任何副作用（side effects）。副作用是指函数在执行过程中除了返回值之
            // 外，还对外部状态产生了影响，例如修改全局变量、进行 I/O 操作、调用外部 API 等。changeLanguage 操作会影响到外
            // 部的状态（即应用的语言环境），而不仅仅是返回一个新的状态对象。
            // 为什么这被认为是有副作用的?
            // 1. 修改外部状态：
            // i18n.changeLanguage(action.payload) 修改了 i18n 库的内部状态，改变了应用的语言环境。这种操作超出了 Reducer
            // 的职责范围，因为 Reducer 应该只负责计算和返回新的状态，而不应该修改外部状态。
            // 2. 不可预测性：
            // 副作用使得函数的行为变得不可预测，因为函数的输出不仅依赖于输入参数，还依赖于外部状态。这违反了纯函数的原则，可能导致调
            // 试和测试变得困难。
            // 3. 副作用管理：
            // 在 Redux 中，副作用通常应该由中间件（如 redux-thunk 或 redux-saga）来处理，而不是在 Reducer 中直接处理。中间件
            // 可以在处理副作用的同时，保持 Reducer 的纯净性。
            // 解决办法: 为了避免在 Reducer 中引入副作用，可以将副作用逻辑移到中间件中。
            i18n.changeLanguage(action.payload); // 国际化处理，这样处理是不标准的，有副作用
            return {...state, language: action.payload};  // 返回新的state，创建新的对象
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload],  // 返回新的list
            };
        default:
            return state;
    }
};
