import React from "react";
import styles from "./ShoppingCart.module.css";
import {FiShoppingCart} from "react-icons/fi";
import {appContext} from "../AppState"

// 定义Props的类型，表示组件从外部接受的参数
interface Props {
}

// 定义State的类型，State表示组件自己的状态
interface State {
    isOpen: boolean
}

/**
 * React.Component是一个泛型接口，第一个参数是props的类型，第二个参数是state的类型，第三个参数是自定义数据
 * 这是一个类组件
 */
class ShoppingCart extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        // 初始化state，state的类型是在State中定义的
        this.state = {
            isOpen: false,
            // aa: "aa" // 因为State中没有定义aa属性，所以会报错
        };

        // 绑定this
        this.handleClick1 = this.handleClick1.bind(this)
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("e.target", e.target)   // e.target是触发事件的元素，点击谁，谁就是target，这里是span
        console.log("e.currentTarget", e.currentTarget) // e.currentTarget是处理绑定事件的元素，这里是button
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            // 写法一
            this.setState({isOpen: !this.state.isOpen});

            // 如果你在类组件中，可以在 `setState` 中传入一个回调函数，该函数会在状态更新完成后执行。
            // 这个没有加括号,需要返回值就要加return
            this.setState((preState) => {
                return {
                    isOpen: !preState.isOpen
                }
            })

            // 下面的这种写法返回值加上了括号，表示返回的是一个对象，而不是一个值
            this.setState((preState) => ({
                isOpen: !preState.isOpen
            }))

            // 在类组件中,这种写法就是不对的,因为类中的state都在一个对象上,更新的时候需要传入一个对象,而不是一个值
            // this.setState(!this.state.isOpen) 错误的写法

            // 在 React 的类组件中，调用 `this.setState` 更新状态时，新的状态将会与之前的状态合并，而不是覆盖整个状态对象。这意味着，
            // 当您更新 `count` 的值时，其他状态值（如 `name` 和 `isLoggedIn`）会保留其当前值。

            // 写法二同写法一样，只不过加了一个回调函数
            // 只不过setState是异步的，所以在setState之后，不能立即获取到最新的state值
            // this.setState({ isOpen: !this.state.isOpen }, () => {
            //     console.log("callback", this.state.isOpen)
            // });

            // 写法三，这是使用return的写法，会返回最新的state值
            // this.setState((preState, preProps) => {
            //     return { isOpen: !preState.isOpen }
            // }, () => {
            //     console.log("callback", this.state.isOpen)
            // });
        }
    }

    handleClick1(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log("e.target", e.target)
        console.log("e.currentTarget", e.currentTarget)
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            this.setState({isOpen: !this.state.isOpen});
        }
    }

    render() {
        return (
            // appContext.Consumer是一个React组件，用来访问全局状态
            <appContext.Consumer>
                {/* value是appContext.Provider提供的全局状态 */}
                {(value) => {
                    return (
                        <div className={styles.cartContainer}>
                            <button className={styles.button} onClick={this.handleClick}>
                                <FiShoppingCart/> {/* FiShoppingCart是一个购物车图标 */}
                                <span>购物车{value.shoppingCart.items.length}（件）</span>
                            </button>
                            <div className={styles.cartDropDown}
                                 style={{
                                     display: this.state.isOpen ? "block" : "none",
                                 }}>
                                <ul>
                                    {value.shoppingCart.items.map((i) => (
                                        <li>{i.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                }}
            </appContext.Consumer>
        );
    }
}

export default ShoppingCart;
