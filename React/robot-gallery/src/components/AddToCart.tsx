import React, { useContext } from "react";
import { appSetStateContext } from "../AppState";
import { RobotProps } from "./Robot"

// 这是一个高阶组件，接收一个组件作为参数，返回一个新的组件，原组件还是按照原来的方式使用，只是多了一个addToCart属性
export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {

    // 返回一个新的组件,这个新的组件接收一个props参数,并把这个props参数传递给ChildComponent
    // 这个新的组件还接收一个addToCart函数，这个函数用来添加商品到购物车，相同于给ChildComponent额外添加了一个addToCart属性
    return (props) => {

        // 获取到全局的setState函数
        const setState = useContext(appSetStateContext);

        const addToCart = (id, name) => {
            if (setState) {
                setState(state => {
                    return {
                        ...state,
                        shoppingCart: {
                            items: [...state.shoppingCart.items, { id, name }]
                        }
                    }
                })
            }
        }

        // 将addToCart函数作为props传递给ChildComponent
        return <ChildComponent {...props} addToCart={addToCart} />
    };
}

// 这是一个自定义hook，用来获取addToCart函数，这个函数用来添加商品到购物车
// 其原理是通过useContext来获取全局的setState函数，然后返回一个addToCart函数
export const useAddToCart = () => {

    const setState = useContext(appSetStateContext);

    const addToCart = (id, name) => {
        if (setState) {
            setState(state => {
                return {
                    ...state,
                    shoppingCart: {
                        items: [...state.shoppingCart.items, { id, name }]
                    }
                }
            })
        }
    }

    return addToCart;
}