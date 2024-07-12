import React, { useState } from 'react';

interface AppStateValue {
    username: string;
    // 这里定义了一个shoppingCart对象，这个对象有一个items属性，items属性是一个数组，数组的元素是一个对象，这个对象有两个属性，id和name
    shoppingCart: { items: { id: number, name: string }[] };
}

// 全局共享的数据
const defaultContextValue: AppStateValue = {
    username: "阿莱克斯",
    shoppingCart: { items: [] }
}

// 创建一个全局的context对象
export const appContext = React.createContext<AppStateValue>(defaultContextValue);

// 创建一个全局的setState的context对象，他的泛型是一个函数或者undefined，用于接收setState函数
// useState的函数类型就是Dispatch<SetStateAction<S>>
export const appSetStateContext = React.createContext<
    React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

export const AppStateProvider: React.FC = (props) => {

    const [state, setState] = useState(defaultContextValue)

    return (
        // appContext.Provider是一个React组件，用来提供全局状态
        // 下面是两个全局状态，一个是value，一个是setState，可以这样嵌套起来使用
        <appContext.Provider value={state}>
            <appSetStateContext.Provider value={setState}>
                {props.children}
            </appSetStateContext.Provider>
        </appContext.Provider>
    );
};